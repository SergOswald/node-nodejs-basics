//npm run streams:read

import * as fs from "node:fs";

const read = async () => {
  let myReadStream = fs.createReadStream("./src/streams/files/fileToRead.txt", "UTF8");
  let myWriteStream = fs.createWriteStream("./src/streams/files/process.stdout", "UTF8");
  myReadStream.on('data', function (chunk) {
    //console.log(chunk.toString());
    myWriteStream.write(chunk.toString());
});
};

await read();