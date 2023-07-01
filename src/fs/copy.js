import * as fs from "node:fs";
import path from "node:path";

const copy = async () => {

fs.mkdir(  path.join("./src/fs", "files-copy"), (err) => {
  if (err) {
    console.log("FS operation failed", err);
  } else {
    fs.readdir( "./src/fs/files", { withFileTypes: true }, 
    (err, files) => {
    if ( err ) { 
      throw err; 
    }else{
    files.forEach( file => {
    fs.copyFile( "./src/fs/files" + `/${file.name}`, "./src/fs/files-copy" + `/${file.name}` , 
    (err) => { 
      if ( err ) { 
        console.log("FS operation failed", err); 
      } });
    });
    };
    });
    };
    });
};

await copy();
