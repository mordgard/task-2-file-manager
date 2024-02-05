import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { MESSAGES } from "../constants.js";

export const compress = async ([source, destination]) => {
  const readable = createReadStream(source);
  const writable = createWriteStream(destination);
  const gzipStream = createBrotliCompress();

  try {
    await pipeline(readable, gzipStream, writable);
  } catch {
    console.log(MESSAGES.failed);
  }
};

export const decompress = async ([source, destination]) => {
  const readable = createReadStream(source);
  const writable = createWriteStream(destination);
  const gunzipStream = createBrotliDecompress();

  try {
    await pipeline(readable, gunzipStream, writable);
  } catch {
    console.log(MESSAGES.failed);
  }
};
