import { execSync } from "child_process";
import { SCRIPT_NAME } from "../constants/base";
import getData from "../utils/getData";
import section from "../utils/section";
import setData from "../utils/saveData";
import getIssueLink from "../utils/getIssueLink";
import { PACKAGE_MANGERS } from "../managers";
import { TrackingStorage } from "../type";

export default function handleRemove(label: string) {
    const data: TrackingStorage = getData();
    if (!data[label]) {
        section("Label Not Found");
        console.error(`Use command: "${SCRIPT_NAME} list". Tracking aborted.`);
        process.exit(1);
    }
    
    let markCmd = "";
    let cleanCmd = "";
    
    section(`Processing Removal "${label}"`);
    for (const manager of Object.keys(data[label])) {
        const pkgs = data[label][manager].packages;
        console.log(`${manager}\t: (${pkgs.length} packages`);

        markCmd += PACKAGE_MANGERS[manager].mark(pkgs.join(" ")) + ";";
        cleanCmd += PACKAGE_MANGERS[manager].remove() + ";";
    }

    try {
        console.log(`🔄 Setting package states to auto-dependency...`);
        execSync(markCmd, { stdio: "inherit" });

        console.log(`🧼 Sweeping away unused packages...`);
        execSync(cleanCmd, { stdio: "inherit" });

        // Remove label from tracking
        delete data[label];
        setData(data);
        console.log(
            `🗑️ Finished! Cleaned up system and deleted label '${label}' from logs.`,
        );
    } catch (e) {
        console.error("❌ An error occurred during the cleanup process.");
        console.error(
            getIssueLink(
                "error",
                "Cleanup Error",
                `Command Used for removing ${label} packages.\nUse Command [${SCRIPT_NAME} list]\ncopy paste the output where label name appears`,
            ),
        );
    }
}