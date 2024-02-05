import crypto from "node:crypto";
import fs from "node:fs";

export const calculate = async ([pathToFile]) => {
  const readable = fs.createReadStream(pathToFile);
  const hash = crypto.createHash("sha256");

  readable
    .on("data", (data) => {
      hash.update(data);
    })
    .on("end", () => {
      console.log(hash.digest("hex"));
    });
};
