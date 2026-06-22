import { PackageManagerStrategy } from "../type"

export const pacman: PackageManagerStrategy = {
        install: (pkgs) => `sudo pacman -S --noconfirm ${pkgs}`,
        mark: (pkgs) => `sudo pacman -D --asdeps ${pkgs}`,
        remove: () => `sudo pacman -Rns \$(pacman -Qdtq) --noconfirm`,
    }