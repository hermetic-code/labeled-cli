export interface PackageManagerStrategy {
    install(pkgs: string): string;
    mark(pkgs: string): string;
    remove(): string;
    checkInstalled(pkg: string): string;
    checkUpdates(pkg: string): string;
}

export interface ManagerData {
    tracked: string[];
    skipped: string[];
    untracked?: string[];
    timestamp: string;
}

export interface LabelData {
    [manager: string]: ManagerData;
}

export interface TrackingStorage {
    [label: string]: LabelData;
}
