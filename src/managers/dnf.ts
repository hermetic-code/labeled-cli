import { execSync } from "node:child_process";
import { PackageManagerStrategy } from "../type";

const isDnf5 = (): boolean => {
    try {
        execSync("which dnf5", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
};

export const dnf: PackageManagerStrategy = {
    install: (pkgs) => `sudo dnf install ${pkgs}`,
    mark: (pkgs) => isDnf5() ? `sudo dnf5 mark dependency --skip-unavailable ${pkgs}` : `sudo dnf mark remove --skip-unavailable ${pkgs}`,
    remove: () => isDnf5() ? `sudo dnf5 autoremove` : `sudo dnf autoremove`
};