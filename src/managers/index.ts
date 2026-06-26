import { PackageManagerStrategy } from '../type';
import { apt } from './apt';
import { dnf } from './dnf';
import { pacman } from './pacman';

export const PACKAGE_MANGERS: Record<string, PackageManagerStrategy> = {
    apt,
    dnf,
    pacman,
};
