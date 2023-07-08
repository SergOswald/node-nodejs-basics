//npm run streams:write

import * as fs from "node:fs";

const write = async () => {
  let myReadStream = fs.createReadStream("./src/streams/files/process.stdin", "UTF8");
    let myWriteStream = fs.createWriteStream("./src/streams/files/fileToWrite.txt", "UTF8");
    myReadStream.on('data', function (chunk) {
      //console.log(chunk.toString());
      myWriteStream.write(chunk.toString());
  });
};

await write();