import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const fst = path.join(__dirname, 'files');
  const snd = path.join(__dirname, 'files_copy');

  try {
    await fs.access(fst);
      //первая папка существует ?
      try {
        await fs.access(snd);
        throw new Error('FS operation failed'); 
        // если существует — ошибка
      } catch (err) {
        if (err.code !== 'ENOENT') throw err; 
        // если ошибки нет — пробрасываем
      }
    await fs.cp(fst, snd, { recursive: true });
    console.log('Copied successfully!');
  } catch {
    throw new Error('FS operation failed');
  }
};


  await copy();

