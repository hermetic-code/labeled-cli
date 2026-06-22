import { writeFileSync } from "fs";
import { JSON_PATH } from "../constants/base";
import { TrackingStorage } from "../type";

export default function setData(data: TrackingStorage) {
    writeFileSync(JSON_PATH, JSON.stringify(data, null, 4));
}