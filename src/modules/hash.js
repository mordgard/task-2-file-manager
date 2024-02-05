import crypto from "node:crypto";
import fs from "node:fs";
import { MESSAGES } from "../constants.js";

export const calculate = async ([pathToFile]) => {
  const readable = fs.createReadStream(pathToFile);
  const hash = crypto.createHash("sha256");

  readable
    .on("data", (data) => {
      hash.update(data);
    })
    .on("end", () => {
      console.log(hash.digest("hex"));
    })
    .on("error", () => {
      console.log(MESSAGES.failed);
    });
};
