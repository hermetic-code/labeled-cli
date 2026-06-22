import { PackageManagerStrategy } from "../type";

export const apt: PackageManagerStrategy = {
    install: (pkgs) => `sudo apt install ${pkgs}`,
    mark: (pkgs) => `sudo apt-mark auto ${pkgs}`,
    remove: () => `sudo apt autoremove`,
};
