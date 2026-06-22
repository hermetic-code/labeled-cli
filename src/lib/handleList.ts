import getData from "../utils/getData";

export default function handleList() {
    const data = getData();
    if (Object.keys(data).length === 0) {
        console.log("📂 No tracked labels found.");
        return;
    }
    console.log(
        `${"LABEL".padEnd(20)} ${"MANAGER".padEnd(10)} ${"DATE".padEnd(20)} PACKAGES`,
    );
    console.log("-".repeat(70));
    for (const [label, info] of Object.entries(data)) {
        for (const manager of Object.keys(info)) {
            console.log(
                `${label.padEnd(20)} ${manager.padEnd(10)} ${info[manager].timestamp?.padEnd(20)} ${info[manager].packages.join(", ")}`,
            );
        }
    }
}