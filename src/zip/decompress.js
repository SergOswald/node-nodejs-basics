//npm run zip:decompress

import * as fs from "node:fs";
import zlib from "node:zlib";
import { pipeline } from "node:stream";
import { createGzip } from "node:zlib";
import { createUnzip } from "node:zlib";

const decompress = async () => {
    let myReadStream = fs.createReadStream("./src/zip/files/archive.gz");
    let myWriteStream = fs.createWriteStream("./src/zip/files/fileToCompress.txt");
    const unzip = zlib.createUnzip();
    myReadStream.pipe(unzip).pipe(myWriteStream);

};

await decompress();