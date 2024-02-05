import fs from "node:fs/promises";
import path from "node:path";

export const ls = async (currentDir) => {
  try {
    const list = await fs.readdir(currentDir);
    const result = [];

    for (const file of list) {
      const isDir = await isDirectory(file);
      const mapped = { Name: file, Type: isDir ? "directory" : "file" };

      result.push(mapped);
    }

    const filtered = result.sort(compareFn);
    console.table(filtered);
  } catch {
    console.log(MESSAGES.failed);
  }

  async function isDirectory(file) {
    try {
      const stat = await fs.stat(path.join(currentDir, file));
      return stat.isDirectory();
    } catch {}
  }

  function compareFn(a, b) {
    if (a.Type !== b.Type) {
      return a.Type === "directory" ? -1 : 1;
    }
    return a.Name.localeCompare(b.Name);
  }
};

export const up = (currentDir) => {
  const parentDir = path.resolve(currentDir, "..");

  if (currentDir !== "/") {
    return parentDir;
  }

  return currentDir;
};

export const cd = (currentPath, [destPath]) => {
  const destination = path.resolve(currentPath, destPath);
  return destination;
};
