import { parentPort } from 'worker_threads';

// безопасный обработчик исключений в воркере
process.on('uncaughtException', (err) => {
  parentPort.postMessage({ status: 'error', data: null });
  process.exit(1);
});

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));
// n - номер члена последовательности

parentPort.on('message', (n) => {
  try {
    const result = nthFibonacci(n);
    parentPort.postMessage({ status: 'resolved', data: result });
  } catch (err) {
    parentPort.postMessage({ status: 'error', data: null });
  }
});
