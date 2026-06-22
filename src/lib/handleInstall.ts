import { execSync } from "child_process";
import getManager from "../utils/getManagers";
import section from "../utils/section";
import getData from "../utils/getData";
import setData from "../utils/saveData";
import { PACKAGE_MANGERS } from "../managers";

export default function handleInstall(label: string, pkgs: string[]) {
    const mgr = getManager();
    section("Install Session");
    console.log(
        `Label\t: ${label}\nManager\t: ${mgr}\nPackages: ${pkgs.join(" ")}\n`,
    );

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
        console.log(`Tracked ${pkgs.length} packages under label "${label}"`);
    } catch (error) {
        section("Installation Failed");
        console.error("Tracking aborted.");
        process.exit(1);
    }
}
