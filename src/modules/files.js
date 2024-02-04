import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { access, rename, writeFile } from "fs/promises";

export const cat = (path) => {};

export const add = async (currentPath, fileName) => {
  try {
    await writeFile(join(currentPath, fileName));
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

export const rn = async (pathToFile, filename) => {
  try {
    await access(pathToFile);
    await rename(pathToFile, filename);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

export const cp = (fileName) => {};

export const mv = (fileName) => {};

export const rm = (fileName) => {};
