import { PackageManagerStrategy } from "../type";
import { isSudo } from "../utils/isSudo";

export const apt: PackageManagerStrategy = {
    install: (pkgs) => `${isSudo}apt install -y ${pkgs}`,
    mark: (pkgs) => `${isSudo}apt-mark auto ${pkgs}`,
    remove: () => `${isSudo}apt autoremove`,
    checkInstalled: (pkg) =>
        `${isSudo}dpkg-query -W -f='\${Status}' ${pkg} 2>/dev/null | grep -q "ok installed"`,
    checkUpdates: (pkg) =>
        `${isSudo}apt-get install --simulate ${pkg} | grep -q "^Inst"`,
};
