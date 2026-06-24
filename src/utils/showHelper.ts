import { SCRIPT_NAME } from "../constants/base";

export default function showHelper(): void {
    const BOLD = "\x1b[1m";
    const DIM = "\x1b[2m";
    const RESET = "\x1b[0m";

    console.log(`\n${BOLD}USAGE:${RESET}`);
    console.log(`  ${SCRIPT_NAME} <command> [options]\n`);

    console.log(`${BOLD}COMMANDS:${RESET}`);
    console.log(`  ${BOLD}install${RESET} <label> <pkgs...>    ${DIM}Install packages and index them under a label${RESET}`);
    console.log(`  ${BOLD}untrack${RESET} <label> <pkgs...>    ${DIM}Remove packages from tracking of labels${RESET}`);
    console.log(`  ${BOLD}remove${RESET}  <label>              ${DIM}Purge system packages associated with a label${RESET}`);
    console.log(`  ${BOLD}list${RESET}                         ${DIM}Display all active labeled environments${RESET}\n`);

    console.log(`${BOLD}ARGUMENTS:${RESET}`);
    console.log(`  <label>    ${DIM}The target tracking identifier group${RESET}`);
    console.log(`  <pkgs...>  ${DIM}Space-separated list of distro system packages${RESET}\n`);
}