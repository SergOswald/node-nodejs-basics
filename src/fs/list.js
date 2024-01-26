import * as fs from "node:fs";
import path from "node:path";

const list = async () => {
  let folderName = "./src/fs/files";

  fs.readdir( folderName, { withFileTypes: true }, ( err, files ) => {
    if(err) {
      console.log("FS operation failed", err);
    }else{
  
    files.forEach(file => {
      if( file.isFile() ) {
        var ext = path.extname( file.name );
        fs.stat( folderName + `/${file.name}` , ( err, stats ) => {
          if (err) { 
            console.log("FS operation failed", err);
          }else{
            console.log(file.name);
          };
        });
      };
    });
  };
  });
};

await list();