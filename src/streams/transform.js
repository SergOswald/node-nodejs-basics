//npm run streams:transform

import * as fs from "node:fs";

const transform = async () => {
    let myReadStream = fs.createReadStream("./src/streams/files/process.stdin", "UTF8");
    let myWriteStream = fs.createWriteStream("./src/streams/files/process.stdout", "UTF8");
    myReadStream.on('data', function (chunk) {
      myWriteStream.write(chunk.toString().split('').reverse().join(''));
    });

};

await transform();