import getData from "../utils/getData";
import { logger } from "../utils/logger";
import section from "../utils/section";

export default function handleList() {
    const data = getData();
    const labelKeys = Object.keys(data);

    // Handle empty data states cleanly without throwing text noise
    if (labelKeys.length === 0) {
        logger.warn("No active tracked labels found in local storage.");
        return;
    }

    const BOLD = "\x1b[1m";
    const DIM = "\x1b[2m";
    const RESET = "\x1b[0m";

    section("Tracked Environments Manifest");

    // Print headers using clean capitalization and clear alignment metrics
    console.log(
        `${BOLD}${"LABEL".padEnd(20)} ${"MANAGER".padEnd(12)} ${"LAST UPDATED".padEnd(22)} PACKAGES${RESET}`,
    );

    // Using a sleek, professional box-drawing divider instead of basic hyphens
    console.log(DIM + "─".repeat(75) + RESET);

    // Loop through tracked indexes to render clear, structured rows
    for (const [label, info] of Object.entries(data)) {
        for (const manager of Object.keys(info)) {
            const managerData = info[manager];
            const timestamp = managerData.timestamp || "NEVER";
            const packageList = managerData.packages.join(", ");

            console.log(
                `${label.padEnd(20)} ${manager.padEnd(12)} ${timestamp.padEnd(22)} ${packageList}`,
            );
        }
    }

    console.log(""); // Trailing vertical space padding
}
