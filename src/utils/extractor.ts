interface ParsedArguments {
    command: string; // e.g., "install"
    label: string; // e.g., "y-fix"
    packages: string[]; // e.g., ["ncdu", "vhs"]
    flags: string[]; // e.g., ["--verbose", "--force", "-y"]
}

// 1. Define your global list of supported flags here
const APPLICABLE_FLAGS = ['--verbose', '-v', '--force', '-f', '--yes', '-y'];

/**
 * Parses process.argv array by checking items against allowed global flags
 * @param argv - Pass process.argv from your entry file
 */
export default function extractor(argv: string[]): ParsedArguments {
    const args = argv.slice(2);

    const command = args[0] || '';
    const label = args[1] || '';

    const packages: string[] = [];
    const flags: string[] = [];

    // 2. Loop through everything after the command and label
    for (let i = 2; i < args.length; i++) {
        const item = args[i];

        if (APPLICABLE_FLAGS.includes(item)) {
            // It is an approved configuration modifier
            flags.push(item);
        } else {
            // It is not an approved flag, so it must be a package name
            packages.push(item);
        }
    }

    return {
        command,
        label,
        packages,
        flags,
    };
}
