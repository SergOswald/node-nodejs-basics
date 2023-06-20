import * as fs from 'node:fs/promises';

const create = async () => {
  // var fs = require('fs');
  // const path = require('path');
  // const path1 = path.format({
  //   dir: './files',
  //   base: 'fresh.txt',
  // });

  fs.writeFile('./src/fs/files/fresh.txt', 
  'I am fresh and young', 
  function(error){
  if(error) throw error; 
  console.log('FS operation failed');
  });
};

await create();