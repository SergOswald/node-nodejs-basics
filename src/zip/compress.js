import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const sourcePath = join(__dirname, 'files', 'fileToCompress.txt');
  const destinationPath = join(__dirname, 'files', 'archive.gz');
  const gzip = createGzip();
  //создаёт поток, который сжимает данные по алгоритму GZIP
  const source = fs.createReadStream(sourcePath);
  const destination = fs.createWriteStream(destinationPath);
  //поток записи
  const pipe = promisify(pipeline);
  //соединяет потоки, ловит все ошибки
  try {
    try {
      await fs.promises.access(destinationPath);
      console.error('archive.gz was already created');
      return; 
      //прерываем выполнение, чтобы не сжимать повторно
    } catch (err) {
      if (err.code !== 'ENOENT') throw err; 
    }
    await pipe(source, gzip, destination);
    console.log('File successfully compressed!');
  } catch (err) {
    console.error('Compression failed:', err.message);
    throw new Error('FS operation failed');
  }
};

await compress();

//node src/zip/compress
