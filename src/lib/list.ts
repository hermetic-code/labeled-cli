import getData from "../utils/getData";
import { logger } from "../utils/logger";
import section from "../utils/section";

export default function list() {
    const data = getData();
    const labelKeys = Object.keys(data);

    // Handle empty data states cleanly without throwing text noise
    if (labelKeys.length === 0) {
        logger.warn("No active tracked labels found in local storage.");
        return;
    }

    // Standard ANSI Terminal Color Codes
    const BOLD = "\x1b[1m";
    const DIM = "\x1b[2m";
    const GREEN = "\x1b[32m";
    const YELLOW = "\x1b[33m";
    const RESET = "\x1b[0m";

    section("Tracked Environments Manifest");

    console.log(
        `${BOLD}${"LABEL / MANAGER".padEnd(24)} ${"STATUS".padEnd(14)} ${"LAST UPDATED".padEnd(20)} PACKAGES${RESET}`,
    );

    console.log(DIM + "─".repeat(80) + RESET);

    // Loop through each tracking session label
    for (const [label, labelInfo] of Object.entries(data)) {
        let isFirstRowForLabel = true;
        
        // Iterate over the properties, skipping the metadata root key
        for (const manager of Object.keys(labelInfo)) {
            if (manager === "created") continue;
            
            const managerData = labelInfo[manager];
            const trackedPkgs = managerData.tracked || [];
            const skippedPkgs = managerData.skipped || [];
            const timestamp = managerData.timestamp || "UNKNOWN";

            // 1. Render Tracked Packages Row
            if (trackedPkgs.length > 0) {
                const labelColumn = isFirstRowForLabel
                    ? BOLD + label + RESET
                    : "";
                console.log(
                    `${labelColumn.padEnd(isFirstRowForLabel ? 24 + BOLD.length + RESET.length : 24)} ` +
                        `${(DIM + "↳ " + RESET + manager).padEnd(12 + DIM.length + RESET.length)} ` +
                        `${GREEN}${"[TRACKED]".padEnd(14)}${RESET} ` +
                        `${timestamp.padEnd(20)} ` +
                        `${trackedPkgs.join(", ")}`,
                );
                isFirstRowForLabel = false; // Next rows for this label leave the column blank
            }

            // 2. Render Skipped Packages Row (Directly underneath the manager)
            if (skippedPkgs.length > 0) {
                const labelColumn = isFirstRowForLabel
                    ? BOLD + label + RESET
                    : "";
                console.log(
                    `${labelColumn.padEnd(isFirstRowForLabel ? 24 + BOLD.length + RESET.length : 24)} ` +
                        `${(DIM + "↳ " + RESET + manager).padEnd(12 + DIM.length + RESET.length)} ` +
                        `${YELLOW}${"[SKIPPED]".padEnd(14)}${RESET} ` +
                        `${timestamp.padEnd(20)} ` +
                        `${DIM}${skippedPkgs.join(", ")}${RESET}`,
                );
                isFirstRowForLabel = false;
            }
        }

        // Add a clean visual divider between different environment blocks
        console.log(DIM + "╌".repeat(80) + RESET);
    }
}
