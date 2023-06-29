import * as fs from 'node:fs/promises';

const create = async () => {
  fs.writeFile('./src/fs/files/fresh.txt', 
  'I am fresh and young', 
  function(error){
  if(error) throw error; 
  console.log('FS operation failed');
  });
};

await create();