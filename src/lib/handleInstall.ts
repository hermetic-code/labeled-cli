import { execSync } from "child_process";
import getManager from "../utils/getManagers";
import section from "../utils/section";
import getData from "../utils/getData";
import setData from "../utils/saveData";
import { PACKAGE_MANGERS } from "../managers";
import { logger } from "../utils/logger";
import getIssueLink from "../utils/getIssueLink";

export default function handleInstall(label: string, pkgs: string[]) {
    const mgr = getManager();
    section("Install Session");

    logger.info("Target Label", label);
    logger.info("Active Manager", mgr);
    logger.info("Packages", pkgs.join(", "));

    let cmd = PACKAGE_MANGERS[mgr].install(pkgs.join(" "));

    section("Package Manager Output");
    try {
        // Run the install command and pipe output directly to the terminal
        execSync(cmd, { stdio: "inherit" });

        // Save metadata on success
        const data = getData();
        if (!data[label]) {
            data[label] = { [mgr]: { packages: [] } };
        }

        // Merge package arrays cleanly (no duplicates)
        data[label][mgr].packages = [
            ...new Set([...data[label][mgr].packages, ...pkgs]),
        ];
        data[label][mgr].timestamp = new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 19);

        setData(data);

        section("Session Complete");
        logger.success(
            `Transaction complete`,
            `Tracked ${pkgs.length} packages under label "${label}"`,
        );
    } catch (error) {
        section("Installation Failed");
        logger.error("Downstream execution aborted", error);

        // Construct and output an automated, clean bug report link for the user
        const contextPayload = `Manager: ${mgr}\nCommand: ${cmd}\nError Context: ${error instanceof Error ? error.message : String(error)}`;
        const bugReport = getIssueLink(
            "bug",
            `Installation tracking failure under ${mgr}`,
            contextPayload,
        );

        console.log(`  ${bugReport}\n`);
        process.exit(1);
    }
}
