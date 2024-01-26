//npm run zip:compress

import * as fs from "node:fs";
import zlib from "node:zlib";
import { pipeline } from "node:stream";
import { createGzip } from "node:zlib";

const compress = async () => {
    let myReadStream = fs.createReadStream("./src/zip/files/fileToCompress.txt", "UTF8");
    let myWriteStream = fs.createWriteStream("./src/zip/files/archive.gz", "UTF8");
    const gzip = createGzip();
    pipeline(myReadStream, gzip, myWriteStream, (err) => {
        if (err) {
          console.error('An error occurred:', err);
          process.exitCode = 1;
        }
      });

};

await compress();