import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip, createGunzip } from "zlib";

export const compress = async ([source, destination]) => {
  const readable = createReadStream(source);
  const writable = createWriteStream(destination);
  const gzipStream = createGzip();

  try {
    await pipeline(readable, gzipStream, writable);
  } catch (error) {
    throw error;
  }
};

export const decompress = async ([source, destination]) => {
  const readable = createReadStream(source);
  const writable = createWriteStream(destination);
  const gunzipStream = createGunzip();

  try {
    await pipeline(readable, gunzipStream, writable);
  } catch (error) {
    throw error;
  }
};
