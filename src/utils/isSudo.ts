export const isSudo =
    typeof process.getuid === 'function' && process.getuid() === 0 ? '' : 'sudo ';
