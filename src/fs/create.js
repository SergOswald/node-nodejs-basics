import * as fs from "node:fs/promises";

const create = async () => {
  fs.writeFile("./src/fs/files/fresh.txt", 
  "I am fresh and young", 
  function(err){
  if(err) {
    console.log("FS operation failed", err);
  };
  });
};

await create();