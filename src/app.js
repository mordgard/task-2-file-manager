import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import os from "node:os";

import { os_module } from "./modules/os.js";
import * as nwd_module from "./modules/nwd.js";
import * as files_module from "./modules/files.js";
import * as hash_module from "./modules/hash.js";
import * as zip_module from "./modules/zip.js";

import { ARGS, MESSAGES, OPERATIONS } from "./constants.js";
import { validateOperations } from "./utils.js";

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
        console.debug("DEBUG: ", { command, args });

        await performOperation(command, args);
        console.log(MESSAGES.currentPath(currentPath));
      }
    }

    process.on("exit", () => console.log(MESSAGES.bye(username)));
    rl.close();
  } catch (error) {
    console.log(MESSAGES.failed);
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
        currentPath = nwd_module.cd(currentPath, args);
        break;

      case OPERATIONS.os:
        if (ARGS.includes(args[0])) {
          os_module[args]();
        } else {
          console.log(MESSAGES.invalid);
        }
        break;

      case OPERATIONS.cat:
        files_module.cat(args);
        break;
      case OPERATIONS.add:
        files_module.add(currentPath, args);
        break;
      case OPERATIONS.rn:
        files_module.rn(args);
        break;
      case OPERATIONS.rm:
        files_module.rm(args);
        break;
      case OPERATIONS.cp:
        files_module.cp(args);
        break;
      case OPERATIONS.mv:
        files_module.mv(args);
        break;

      case OPERATIONS.compress:
        await zip_module.compress(args);
        break;
      case OPERATIONS.decompress:
        await zip_module.decompress(args);
        break;

      case OPERATIONS.hash:
        await hash_module.calculate(args);
        break;

      default:
        break;
    }
  }
};
