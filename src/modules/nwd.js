import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import os from "node:os";

export const ls = async (path = ".") => {
  try {
    const list = await fs.readdir(path);
    const result = [];

    for (const file of list) {
      const isDir = await isDirectory(file);
      const mapped = { Name: file, Type: isDir ? "directory" : "file" };

      result.push(mapped);
    }

    const filtered = result.sort(compareFn);
    console.table(filtered);
  } catch (error) {
    console.log(error);
  }

  async function isDirectory(file) {
    try {
      const stat = await fs.stat(file);
      return stat.isDirectory();
    } catch (error) {
      console.log(error);
    }
  }

  function compareFn(a, b) {
    if (a.Type !== b.Type) {
      return a.Type === "directory" ? -1 : 1;
    }
    return a.Name.localeCompare(b.Name);
  }
};

export const up = () => {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);
  const rootDir = os.homedir();

  if (currentDir !== rootDir) {
    process.chdir(parentDir);
  }
};

export const cd = (path) => {
  process.chdir(path);
};
