import handleInstall from "../lib/handleInstall";
import handleList from "../lib/handleList";
import handleRemove from "../lib/handleRemove";
import showHelper from "./showHelp";

// Minimalist Argument Parsing
const args = process.argv.slice(2);
const command = args[0];

switch (true) {
    case ["install", "i"].includes(command):
        const label = args[1];
        if (!label || args.slice(2).length === 0) {
            showHelper();
            break;
        } else {
            const pkgs = args.slice(2);
            handleInstall(label, pkgs);
        }
        break;
    case ["remove", "uninstall", "u"].includes(command):
        if (!args[1]) {
            showHelper();
            break;
        } else {
            console.log(args.slice(1));
            for (const label of args.slice(1)) {
                handleRemove(label);
            }
        }
        break;
    case ["l", "list"].includes(command):
        handleList();
        break;
    default:
        showHelper();
        break;
}
