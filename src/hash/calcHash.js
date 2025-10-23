import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = crypto.createHash('sha256');
  //создаем объект хеширования, держит промежуточные состояния вычисления
  const stream = fs.createReadStream(filePath);
  //читаем файл чанк за чанком

  stream.on('data', chunk => hash.update(chunk));
  //добавляем чанк к чанку
  stream.on('end', () => console.log(hash.digest('hex')));
  //завершаем вычисления и в конце выдаем итог в формате 'hex'
  stream.on('error', err => console.error('Error reading file:', err.message));
};

await calculateHash();

//Хэширование — это процесс, при котором из любых исходных данных (текст, файл, пароль и т.д.)
//вычисляется уникальная строка фиксированной длины — так называемый хэш или отпечаток.