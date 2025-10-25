import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const performCalculations = async () => {
  const cpuCount = os.cpus().length || 1;
  //количество ядер
  const workerFileUrl = new URL('./worker.js', import.meta.url);
  const baseNumber = 10;
  //начальное значение номера члена в ряду

  // Промисы, по одному на каждого воркера, сохраняют порядок
  const promises = Array.from({ length: cpuCount }).map((_, i) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerFileUrl, { type: 'module' });
      let flag = false;
      worker.on('message', (msg) => {
        if (!flag) {
          flag = true;
          resolve(msg); 
          worker.terminate().catch(() => {});
        // завершить воркер (если нужно)
        }
      });

      // ошибка внутри воркера
      worker.on('error', (err) => {
        if (!flag) { flag = true; resolve({ status: 'error', data: null }); }
      });

      worker.on('exit', (code) => {
        if (!flag) {
          flag = true;
          // если код 0 — возможно уже прислали сообщение и resolve вызван; иначе — ошибка
          if (code === 0) {
            resolve({ status: 'error', data: null });
          } else {
            resolve({ status: 'error', data: null });
          }
        }
      });

      // посылаем значение (10, 11, 12, ...)
      worker.postMessage(baseNumber + i);
    });
  });

  const results = await Promise.all(promises);
  console.log(results);
  return results;
};

await performCalculations();

//node src/wt/main
