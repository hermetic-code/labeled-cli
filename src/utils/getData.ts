import { existsSync, mkdirSync, readFileSync } from "fs";
import { CONFIG_DIR, JSON_PATH } from "../constants/base";
import { TrackingStorage } from "../type";

export default function getData(): TrackingStorage {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }
    if (!existsSync(JSON_PATH)) {
        return {};
    }
    try {
        const raw = readFileSync(JSON_PATH, "utf8");
        return JSON.parse(raw || "{}");
    } catch (e) {
        console.warn("⚠️ Warning: JSON file corrupted. Starting fresh.");
        return {};
    }
}