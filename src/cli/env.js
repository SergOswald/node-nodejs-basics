import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envData = fs.readFileSync(envPath, 'utf8');

//грузим переменные среды из .env

for (const itm of envData.split('\n')) {
  const trimmed = itm.trim();
  //удаляем пробелы в начале и в конце каждого элемента
  if (!trimmed || trimmed.startsWith('#')) continue; 
  // пропуск комментариев
  const [key, value] = trimmed.split('=');
  process.env[key] = value; 
  // записываем переменную в окружение
}



const parseEnv = () => {
 const entries = Object.entries(process.env)
 .filter(([key]) => key.startsWith('RSS_')) 
 .map(([key, value]) => `${key}=${value}`)  
 .join('; ');                              
 console.log(entries);
};

parseEnv();
