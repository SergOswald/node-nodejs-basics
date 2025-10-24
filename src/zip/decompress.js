import fs from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
  const sourcePath = join(__dirname, 'files', 'archive.gz');
  const destinationPath = join(__dirname, 'files', 'fileToCompress.txt');

  const gunzip = createGunzip();
  //создаёт Transform Stream, который выполняет распаковку
  const source = fs.createReadStream(sourcePath);
  const destination = fs.createWriteStream(destinationPath);

  const pipe = promisify(pipeline);

  try {
    try {
        await fs.promises.access(destinationPath);
        console.error('archive.gz was already uncompressed, delete old fileToCompress.txt');
        return; 
        //прерываем выполнение, чтобы не разархивировать повторно
      } catch (err) {
        if (err.code !== 'ENOENT') throw err; 
      }  
    await pipe(source, gunzip, destination);
    //канал связывает потоки
    console.log('File successfully decompressed!');
  } catch (err) {
    console.error('Decompression failed:', err.message);
    throw new Error('FS operation failed');
  }
};

await decompress();

//node src/zip/decompress
