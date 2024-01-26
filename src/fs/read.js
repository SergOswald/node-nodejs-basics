import * as fs from "node:fs";

const read = async () => {
  fs.readFile("./src/fs/files/fileToRead.txt", "utf8", function(err,data){
    if (err) {
      console.log("FS operation failed", err);
    }else{
      console.log(data);
    };
  });
};

await read();