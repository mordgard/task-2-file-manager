import { join, dirname } from "path";
import { rename, writeFile, readFile, rm as remove, copyFile } from "fs/promises";
import { MESSAGES } from "../constants.js";

export const cat = async ([pathToFile]) => {
  try {
    const content = await readFile(pathToFile, "utf8");
    console.log(content);
  } catch {
    console.log(MESSAGES.failed);
  }
};

export const add = async (currentPath, [fileName]) => {
  try {
    await writeFile(join(currentPath, fileName), "");
  } catch {
    console.log(MESSAGES.failed);
  }
};

export const rn = async ([pathToFile, filename]) => {
  try {
    await rename(pathToFile, filename);
  } catch {
    console.log(MESSAGES.failed);
  }
};

export const cp = async ([pathToFile, pathToNewDir]) => {
  try {
    await copyFile(pathToFile, pathToNewDir);
  } catch {
    console.log(MESSAGES.failed);
  }
};

export const mv = ([pathToFile, pathToNewDir]) => {
  try {
  } catch {
    console.log(MESSAGES.failed);
  }
};

export const rm = async ([pathToFile]) => {
  try {
    await remove(pathToFile);
  } catch (error) {
    console.log(MESSAGES.failed);
  }
};
