import process from "node:process";
import { fileURLToPath } from "node:url";
import { join, dirname, resolve } from "node:path";

import { OPERATIONS } from "./constants.js";

export const parseArgs = () => {
  const args = process.argv;

  const filteredArgs = args
    .map((value, idx, arr) => {
      if (value.startsWith("--")) {
        return value.slice(2).split("=");
      }
    })
    .filter((value) => Array.isArray(value));

  return filteredArgs;
};

export const getCurrentDirPath = (metaUrl) => {
  const dir = dirname(fileURLToPath(metaUrl));
  return dir;
};

export const validateOperations = (input) => {
  if (!input) return false;

  const [command] = input.split(" ");

  if (Object.keys(OPERATIONS).includes(command)) {
    return true;
  }

  return false;
};

export const resolvePath = (current, destination) => {
  return resolve(current, destination);
};
