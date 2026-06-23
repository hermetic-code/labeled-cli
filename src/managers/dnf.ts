import { execSync } from "node:child_process";
import { PackageManagerStrategy } from "../type";
import { isSudo } from "../utils/isSudo";

const isDnf5 = (): boolean => {
    try {
        execSync("which dnf5", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
};

export const dnf: PackageManagerStrategy = {
    install: (pkgs) => `${isSudo}dnf install ${pkgs}`,
    mark: (pkgs) =>
        isDnf5()
            ? `${isSudo}dnf5 mark dependency --skip-unavailable ${pkgs}`
            : `${isSudo}dnf mark remove --skip-unavailable ${pkgs}`,
    remove: () =>
        isDnf5() ? `${isSudo}dnf5 autoremove` : `${isSudo}dnf autoremove`,
};
