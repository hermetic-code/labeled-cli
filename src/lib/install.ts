import { execSync } from "child_process";
import readline from "readline";
import getManager from "../utils/getManagers";
import section from "../utils/section";
import getData from "../utils/getData";
import setData from "../utils/saveData";
import { PACKAGE_MANGERS } from "../managers";
import { logger } from "../utils/logger";
import { TrackingStorage } from "../type";

export default async function install(label: string, pkgs: string[]) {
    const mgr = getManager();
    section("Install Session");

    logger.info("Target Label", label);
    logger.info("Active Manager", mgr);
    logger.info("Packages to process", pkgs.join(", "));

    // 1. Prompt for User Input upfront
    const proceed = await promptUserConfirmation(pkgs);
    if (!proceed) {
        logger.warn("Transaction aborted by the user.");
        process.exit(0);
    }

    section("Package Manager Output");

    const trackedArray: string[] = [];
    const skippedArray: string[] = [];
    const updatedArray: string[] = [];

    // 2. One by one installation loop with status tracking
    for (const pkg of pkgs) {
        try {
            const status = determinePackageStatus(mgr, pkg);

            if (status === "ALREADY_INSTALLED") {
                skippedArray.push(pkg); // Avoids touching daily drivers
                continue;
            }

            if (status === "NEEDS_UPDATE") {
                updatedArray.push(pkg);
                // System has it, but it's changing state, so we run the installer
            } else {
                trackedArray.push(pkg); // Fresh new install
            }

            // Run individual package installation natively
            const singleCmd = PACKAGE_MANGERS[mgr].install(pkg);
            execSync(singleCmd, { stdio: "inherit" });
        } catch (error) {
            logger.error(
                `Failed during processing of package "${pkg}"`,
                error instanceof Error ? error.message : String(error),
            );
            process.exit(1);
        }
    }

    // 3. Logs the granular result
    section("Transaction Results summary");
    if (trackedArray.length > 0)
        logger.success("Newly Tracked", trackedArray.join(", "));
    if (updatedArray.length > 0)
        logger.info("Updated/Upgraded", updatedArray.join(", "));
    if (skippedArray.length > 0)
        logger.warn("Skipped (Pre-existing)\n" + skippedArray.join(", "));

    if (trackedArray.length === 0 && updatedArray.length === 0) {
        logger.warn("No structural changes recorded to the tracking file.");
        return;
    }

    // 4. Updates tracking.json with our optimized, lean relational structure
    const data: TrackingStorage = getData();

    if (!data[label]) {
        data[label] = {
            [mgr]: {
                tracked: [],
                skipped: [],
                timestamp: new Date()
                    .toISOString()
                    .replace("T", " ")
                    .substring(0, 19),
            },
        };
    }

    // Append items cleanly
    data[label][mgr].tracked = [
        ...new Set([
            ...data[label][mgr].tracked,
            ...trackedArray,
            ...updatedArray,
        ]),
    ];
    data[label][mgr].skipped = [
        ...new Set([...data[label][mgr].skipped, ...skippedArray]),
    ];

    setData(data);
    section("Session Complete");
}

/**
 * Clean helper using readline to prompt the user globally before starting execution loops
 */
function promptUserConfirmation(pkgs: string[]): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(
            `\n⚠️ Labeled will process [${pkgs.join(", ")}]. Proceed? (y/N): `,
            (answer) => {
                rl.close();
                resolve(
                    answer.toLowerCase() === "y" ||
                        answer.toLowerCase() === "yes",
                );
            },
        );
    });
}

/**
 * Uses explicit non-destructive exit-status checks to isolate native target environments
 */
function determinePackageStatus(
    mgr: string,
    pkg: string,
): "NEW_INSTALL" | "ALREADY_INSTALLED" | "NEEDS_UPDATE" {
    try {
        // Check if installed
        execSync(PACKAGE_MANGERS[mgr].checkInstalled(pkg), {
            stdio: "ignore",
        });

        // If it makes it here, it is installed. Let's see if an update is pending
        try {
            execSync(PACKAGE_MANGERS[mgr].checkUpdates(pkg), {
                stdio: "ignore",
            });
            return "ALREADY_INSTALLED"; // No updates pending
        } catch (code) {
            // dnf check-update returns exit code 100 if updates are available!
            return "NEEDS_UPDATE";
        }
    } catch {
        return "NEW_INSTALL"; // Threw error on installation check, meaning it doesn't exist
    }
}
