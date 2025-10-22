import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const folderPath = path.join(__dirname, 'files');
  //const filePath = path.join(folderPath, 'fresh.txt');
  const filePath = path.join(folderPath, 'fileToRemove.txt');
  try {
    try {
      await fs.access(filePath);
      throw new Error('FS operation failed');
      //если файл существует-ошибка
    } catch (err) { 
      if (err.code !== 'ENOENT') throw err;
    }
    await fs.mkdir(folderPath, { recursive: true });
      //создаем папку, если папка уже существует-ошибки нет
    await fs.writeFile(filePath, 'I am fresh and young', 'utf8');
    console.log('File created successfully!');
  } catch (err) {
    console.error(err.message);
  }
};

await create();





