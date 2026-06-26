import install from "./lib/install";
import list from "./lib/list";
import remove from "./lib/remove";
import untrack from "./lib/untrack";
import extractor from "./utils/extractor";
import { logger } from "./utils/logger";
import showHelper from "./utils/showHelper";

// Minimalist Argument Parsing
const { command, label, packages } = extractor(process.argv);

switch (true) {
    case ["install", "i"].includes(command):
        if (!label || packages.length === 0) {
            showHelper();
            break;
        } else {
            install(label, packages);
        }
        break;
    case ["remove", "uninstall", "u"].includes(command):
        console.log(label);
        if (!label) {
            showHelper();
            break;
        } else {
            for (const name of [label, ...packages]) {
                remove(name);
            }
        }
        break;
    case ["l", "list"].includes(command):
        list();
        break;
    case ["untrack"].includes(command): // 2. Add the action routing case
        if (!label || packages.length === 0) {
            logger.error(
                "Usage Error",
                "Surgical mutation targets unspecified.",
            );
            console.log("  👉 Usage: labeled untrack <label> <package>\n");
            process.exit(1);
        }
        untrack(label, packages);
        break;
    default:
        showHelper();
        break;
}
