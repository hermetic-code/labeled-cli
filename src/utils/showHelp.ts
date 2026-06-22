import { SCRIPT_NAME } from "../constants/base";

export default function showHelper() {
    console.log(`\nUsage:
  ${SCRIPT_NAME} install [name] <pkg1> <pkg2> ...
  ${SCRIPT_NAME} remove [name1] [name2] [name3]
  ${SCRIPT_NAME} list`);
}
