import { PackageManagerStrategy } from '../type';
import { isSudo } from '../utils/isSudo';

export const pacman: PackageManagerStrategy = {
    install: (pkgs) => `${isSudo}pacman -S --needed --noconfirm --asdeps ${pkgs}`,
    mark: (pkgs) => {
        return `${isSudo}sh -c 'for pkg in ${pkgs}; do pacman -Qq "$pkg" >/dev/null 2>&1 && pacman -D --asdeps "$pkg"; done || true'`;
    },
    remove: () => {
        return `${isSudo}sh -c 'orphans=$(pacman -Qdtq); if [ -n "$orphans" ]; then pacman -Rns $orphans; else echo "Nothing to do."; fi'`;
    },
    checkInstalled: (pkg) => `${isSudo}pacman -Q ${pkg}`,
    checkUpdates: (pkg) => `${isSudo}pacman -Qu ${pkg}`,
};
