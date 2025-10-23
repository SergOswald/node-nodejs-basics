import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  if (!fs.existsSync(filePath)) { throw new Error('FS operation failed');}
  //проверяем наличие файла для чтения
  const readableStream = fs.createReadStream(filePath, 'utf-8');
  //создаем читаемый стрим
  readableStream.pipe(process.stdout);
  //передаем на вывод в консоль содержимое текстового файла
};

await read();