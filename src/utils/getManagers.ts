import { execSync } from "child_process";
import { PACKAGE_MANGERS } from "../managers";
import getIssueLink from "./getIssueLink";

export default function getManager() {
    for (const manager of Object.keys(PACKAGE_MANGERS)) {
        try {
            execSync(`which ${manager}`, { stdio: "ignore" });
            return manager;
        } catch (e) {}
    }

    console.error(
        `❌ Error: Package manager not found.\n\nREPORT ISSUE: ${getIssueLink("error", "Package Manager Not Found", "I use this distro [Insert your distro name here.]\n<!-- Use this command to find distro: [source /etc/os-release && echo $NAME $VERSION] -->")}`,
    );
    process.exit(1);
}