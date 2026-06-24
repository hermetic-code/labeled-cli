import { execSync } from "child_process";
import { SCRIPT_NAME } from "../constants/base";
import getData from "../utils/getData";
import section from "../utils/section";
import setData from "../utils/saveData";
import getIssueLink from "../utils/getIssueLink";
import { PACKAGE_MANGERS } from "../managers";
import { TrackingStorage } from "../type";
import { logger } from "../utils/logger";

export default function remove(label: string) {
    const data: TrackingStorage = getData();
    if (!data[label]) {
        section("Label Not Found");
        logger.error(
            "Target environment matching failed",
            new Error(
                `No package records match "${label}". Run "${SCRIPT_NAME} list" to view valid options.`,
            ),
        );
        process.exit(1);
    }

    let markCmd = "";
    let cleanCmd = "";

    section(`Processing Removal "${label}"`);
    for (const manager of Object.keys(data[label])) {
        const pkgs = data[label][manager].tracked;
        logger.info(
            `Queued Environment`,
            `${manager} (${pkgs.length} packages)`,
        );

        markCmd += PACKAGE_MANGERS[manager].mark(pkgs.join(" ")) + ";";
        cleanCmd += PACKAGE_MANGERS[manager].remove() + ";";
    }

    try {
        logger.info(
            "System Transition",
            "Setting package states to auto-dependency status",
        );
        console.log("\n");
        execSync(markCmd, { stdio: "inherit" });
        console.log("\n");
        
        logger.info(
            "System Purge",
            "Sweeping away unreferenced orphan packages",
        );
        console.log("\n");
        execSync(cleanCmd, { stdio: "inherit" });

        // Remove label from tracking
        delete data[label];
        setData(data);

        section("Cleanup Complete");
        logger.success(
            "Transaction purged successfully",
            `System wiped clean and label "${label}" dropped from records.`,
        );
    } catch (e) {
        section("Purge Transaction Failed");
        logger.error(
            "An unexpected breakdown occurred during system cleanup",
            e,
        );

        // Generate contextual issue reporting data for GitHub
        const contextPayload = `Label: ${label}\nExecution Flow:\nMark Chain: ${markCmd}\nClean Chain: ${cleanCmd}`;
        const bugReport = getIssueLink(
            "error",
            "System environment cleanup breakdown",
            contextPayload,
        );

        console.log(`  ${bugReport}\n`);
        process.exit(1);
    }
}
