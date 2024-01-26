import crypto from "crypto";
import fs from "node:fs";
// npm run hash
const calculateHash = async () => {
  fs.readFile("./src/hash/files/fileToCalculateHashFor.txt", (err, data) => {
    if (err) {
      console.log("FS operation failed", err);
    } else {
      console.log(crypto.createHash('sha256').update(data).digest('hex'));
    }
});
};

await calculateHash();