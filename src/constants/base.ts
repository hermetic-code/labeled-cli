import { join } from 'path';

export const SCRIPT_NAME = 'labeled';

export const CONFIG_DIR = join(
    process.env.HOME as string,
    '.local',
    'config',
    SCRIPT_NAME
);

export const JSON_PATH = join(CONFIG_DIR, 'tracking.json');
