import getManager from "../utils/getManagers";
import section from "../utils/section";
import getData from "../utils/getData";
import setData from "../utils/saveData";
import { logger } from "../utils/logger";

/**
 * Surgically removes a package from a label configuration matrix
 * Usage: labeled untrack <label> <pkg>
 */
export default function untrack(label: string, pkgs: string[]) {
    const mgr = getManager();
    section("Untrack Package Session");

    if (!label) {
        logger.error("Execution Aborted", "Missing target tracking identifier label.");
        console.log("  Usage: labeled untrack <label> <package>\n");
        process.exit(1);
    }

    if (!pkgs || pkgs.length === 0) {
        logger.error("Execution Aborted", "No packages specified for untracking operations.");
        console.log("  Usage: labeled untrack <label> <package>\n");
        process.exit(1);
    }

    const targetPkg = pkgs[0]; // Extract the singular target package from our array parsing utility
    const data = getData();

    // Verification Step 1: Does the tracking label environment even exist?
    if (!data[label]) {
        logger.error("Target Not Found", `No active tracking session named "${label}" exists.`);
        process.exit(1);
    }

    // Verification Step 2: Does the active package manager own records under this label?
    if (!data[label][mgr]) {
        logger.error("Manager Mismatch", `No data recorded for manager "${mgr}" under label "${label}".`);
        process.exit(1);
    }

    const managerData = data[label][mgr];
    const trackedList: string[] = managerData.tracked || [];
    const skippedList: string[] = managerData.skipped || [];
    const untrackedList: string[] = managerData.untracked || [];

    // Verification Step 3: Check if the package is in the active list
    const isTracked = trackedList.includes(targetPkg);
    const isSkipped = skippedList.includes(targetPkg);

    if (!isTracked && !isSkipped) {
        logger.error("Package Not Found", `"${targetPkg}" is not registered under label "${label}" for ${mgr}.`);
        process.exit(1);
    }

    // Mutate the primitive arrays by filtering out the target package string
    if (isTracked) {
        managerData.tracked = trackedList.filter((p) => p !== targetPkg);
    } else if (isSkipped) {
        managerData.skipped = skippedList.filter((p) => p !== targetPkg);
    }
    
    managerData.untracked = [...untrackedList, ...pkgs];

    logger.success("Mutation Complete", `Removed "${targetPkg}" configuration linking metrics.`);

    // 🧼 Clean Storage Safety Check: Prune empty branches to prevent file creep
    const remainingTracked = managerData.tracked.length;
    const remainingSkipped = managerData.skipped?.length || 0;

    if (remainingTracked === 0 && remainingSkipped === 0) {
        // No packages left under this specific manager inside the label configuration block
        delete data[label][mgr];
        logger.info("Storage Cleanup", `Pruned empty "${mgr}" matrix mapping from database profile.`);
    }

    // If the label has no managers left (only the metadata 'created' key remains), clear the root label entry
    const labelKeys = Object.keys(data[label]);
    if (labelKeys.length === 1 && labelKeys[0] === "created") {
        delete data[label];
        logger.info("Storage Cleanup", `Environment "${label}" is empty. Pruned profile manifest entry cleanly.`);
    }

    // Flush mutations directly back into local file storage
    setData(data);

    section("Session Complete");
    logger.success("Database Synchronized", `Changes saved securely to tracking storage structure.`);
}