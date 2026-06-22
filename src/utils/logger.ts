// src/utils/logger.ts

const TSC = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    dim: "\x1b[2m",
};

export const logger = {
    success(message: string, detail?: string): void {
        console.log(`\n${TSC.green}${TSC.bold}[SUCCESS]${TSC.reset} ${message}`);
        if (detail) console.log(`          ${TSC.dim}${detail}${TSC.reset}\n`);
    },

    info(action: string, context: string): void {
        // Uses the minimalist geometric character '›' instead of an emoji pointer
        console.log(` ${TSC.blue}›${TSC.reset} ${action}: ${TSC.dim}${context}${TSC.reset}`);
    },

    error(summary: string, errorInstance: unknown): void {
        console.error(`\n${TSC.red}${TSC.bold}[ERROR] ${summary}${TSC.reset}`);
        console.error(`${TSC.red}──────────────────────────────────────────────────${TSC.reset}`);
        
        if (errorInstance instanceof Error) {
            console.error(`  ${TSC.bold}Reason:${TSC.reset} ${errorInstance.message}`);
        } else {
            console.error(`  ${TSC.bold}Context:${TSC.reset} ${String(errorInstance)}`);
        }
        console.error(`${TSC.red}──────────────────────────────────────────────────${TSC.reset}\n`);
    },
    
    warn(message: string): void {
        const TSC = {
            bold: "\x1b[1m",
            yellow: "\x1b[33m",
            reset: "\x1b[0m"
        };
        console.log(`\n${TSC.yellow}${TSC.bold}[WARN]${TSC.reset} ${message}\n`);
    },
};