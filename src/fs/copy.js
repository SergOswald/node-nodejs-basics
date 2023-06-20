import * as fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const copy = async () => {


    fs.mkdir( path.join( "./src/fs", "files-copy"), ( err ) => {
       if ( err ) { return console.error( err ); };
    });
   
    let folderName = "./src/fs/files";
    
    let folderNameNew = "./src/fs/files-copy";

    fs.readdir( folderName, { withFileTypes: true }, 
      (err, files) => {
        if ( err ) { throw err; };
        files.forEach( file => {
        fs.copyFile( folderName + `/${file.name}`, folderNameNew + `/${file.name}` , 
        (err) => { if ( err ) { console.log( 'FS operation failed' , err ); } });
        }
        ) ;
    
      }
    ) ;
};

await copy();


