export interface PackageManagerStrategy {
    install(pkgs: string): string;
    mark(pkgs: string): string;
    remove(): string;
}

export interface ManagerData {
    packages: string[];
    timestamp?: string;
}

export interface LabelData {
    [manager: string]: ManagerData;
}

export interface TrackingStorage {
    [label: string]: LabelData;
}
