import path, { join } from 'path';
import os from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// Аналоги __filename и __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Импорт JS-файла с побочными эффектами
import './files/c.js';

// Выбираем случайный JSON-файл
const random = Math.random();
const filePath = random > 0.5 ? './files/a.json' : './files/b.json';

// Чтение JSON вручную
const jsonText = readFileSync(join(__dirname, filePath), 'utf-8');
const unknownObject = JSON.parse(jsonText);

// Вывод системной информации
console.log(`Release ${os.release()}`);
console.log(`Version ${os.version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

// Создание HTTP-сервера
const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

// Вывод содержимого JSON
console.log(unknownObject);

// Запуск сервера
myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

// Экспорт для других модулей
export { unknownObject, myServer };


// node src/modules/esm.mjs