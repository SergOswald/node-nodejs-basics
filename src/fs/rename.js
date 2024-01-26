import * as fs from "node:fs";

const rename = async () => {
  fs.rename("./src/fs/files/wrongFilename.txt", "./src/fs/files/wrongFilename.md", (err) => {
    if (err) {
    console.log("FS operation failed", err);
    };
  });
};

await rename();