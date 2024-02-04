import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import os from "node:os";

import * as os_module from "./modules/os.js";
import * as nwd_module from "./modules/nwd.js";
import * as files_module from "./modules/files.js";
import * as hash_module from "./modules/hash.js";
import * as zip_module from "./modules/zip.js";

import { MESSAGES, OPERATIONS } from "./constants.js";
import { getCurrentDirPath, validateOperations } from "./utils.js";

export const app = async (username) => {
  const rl = readline.createInterface({ input, output });
  let answer;
  let currentPath = os.homedir();

  try {
    console.log(MESSAGES.welcome(username));
    console.log(MESSAGES.currentPath(currentPath));

    while (answer !== MESSAGES.exit) {
      answer = await rl.question("");

      if (validateOperations(answer)) {
        const [command, ...args] = answer.split(" ");
        console.log({ command, args });
        await performOperation(command, args);
        console.log(MESSAGES.currentPath(currentPath));
      }
    }

    process.on("exit", () => console.log(MESSAGES.bye(username)));
    rl.close();
  } catch (error) {
    console.log(error.message);
    rl.close();
  }

  async function performOperation(command, args) {
    switch (command) {
      case OPERATIONS.ls:
        await nwd_module.ls(currentPath);
        break;
      case OPERATIONS.up:
        currentPath = nwd_module.up(currentPath);
        break;
      case OPERATIONS.cd:
        currentPath = nwd_module.cd(args);
        break;
      case OPERATIONS.os:
        currentPath = os_module.cd(args);
        break;

      case OPERATIONS.add:
        files_module.add(currentPath, args);
        break;

      case OPERATIONS.compress:
        break;
      case OPERATIONS.decompress:
        break;

      case OPERATIONS.hash:
        hash_module.calculate(args);
        break;

      default:
        break;
    }
  }
};
