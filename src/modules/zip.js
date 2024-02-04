import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip, createGunzip } from "zlib";

// const sourceFile = join(dirname(fileURLToPath(import.meta.url)), "files", "fileToCompress.txt");
// const destinationFile = join(dirname(fileURLToPath(import.meta.url)), "files", "archive.gz");

export const compress = async (source, destination) => {
  const readable = createReadStream(source);
  const writable = createWriteStream(destination);
  const gzipStream = createGzip();

  try {
    await pipeline(readable, gzipStream, writable);
  } catch (error) {
    throw error;
  }
};

export const decompress = async () => {
  const readable = createReadStream(sourceFile);
  const writable = createWriteStream(destinationFile);
  const gunzipStream = createGunzip();

  try {
    await pipeline(readable, gunzipStream, writable);
  } catch (error) {
    throw error;
  }
};
