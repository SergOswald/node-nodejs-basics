import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');

  if (!fs.existsSync(join(__dirname, 'files'))) {
    throw new Error('FS operation failed');
  }

  const writableStream = fs.createWriteStream(filePath, { flags: 'w' });
  //создаем стрим пригодный для записи флаг очищает содержимое файла при новом запуске
  
  process.stdin.pipe(writableStream);
  //записываем то что ввели в файл

  writableStream.on('finish', () => { console.log('Data successfully written to file.');});

  writableStream.on('error', (err) => { console.error('Write error:', err.message);});
};

await write();

// node src/streams/read
// вводим данне в консоль-они записываются в файл. Для прерывания в вижуалкод жмем контр+С

