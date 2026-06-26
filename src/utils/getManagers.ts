import { execSync } from "child_process";
import { PACKAGE_MANGERS } from "../managers";
import getIssueLink from "./getIssueLink";
import { logger } from "./logger";

export default function getManager() {
    for (const manager of Object.keys(PACKAGE_MANGERS)) {
        try {
            execSync(`command -v ${manager}`, { stdio: "ignore" });
            return manager;
        } catch {
            continue;
        }
    }

    logger.error(
        "Execution engine failure",
        new Error(`Package manager is not configured in this codebase.`),
    );
    console.log(
        getIssueLink(
            "error",
            "Package Manager Not Found",
            "I use this distro [Insert your distro name here.]\n<!-- Use this command to find distro: [source /etc/os-release && echo $NAME $VERSION] -->",
        ),
        "\n",
    );
    process.exit(1);
}
