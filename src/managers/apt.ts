import { PackageManagerStrategy } from "../type";
import { isSudo } from "../utils/isSudo";

export const apt: PackageManagerStrategy = {
    install: (pkgs) => `${isSudo}apt install ${pkgs}`,
    mark: (pkgs) => `${isSudo}apt-mark auto ${pkgs}`,
    remove: () => `${isSudo}apt autoremove`,
};
