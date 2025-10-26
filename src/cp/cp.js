import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  // Путь к дочернему скрипту
  const scriptPath = join(__dirname, 'files', 'script.js');

  // Создаём дочерний процесс
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'] 
    // stdin и stdout связаны, stderr выводится в консоль
    //параметр stdio управляет тем, 
    // как родительский процесс взаимодействует с потоками ввода-вывода (stdin, stdout, stderr) 
    // своего дочернего процесса
    //stdio — это массив или строка, описывающая, что делать с тремя стандартными потоками дочернего процесса
    //Родитель может писать в child.stdin
    //Родитель может читать из child.stdout
    //Ошибки (stderr) ребёнка сразу выводятся в консоль родителя
  });

  // Слушаем ответы от дочернего процесса
  child.stdout.on('data', (data) => {
    console.log(`Child says: ${data.toString().trim()}`);
  });

  // Отправляем сообщение в дочерний процесс
  const message = 'Hello from master';
  console.log(`Master sends: ${message}`);
  child.stdin.write(message + '\n');

  // Отправляем команду закрытия через 1 секунду
  setTimeout(() => {
    child.stdin.write('CLOSE\n');
  }, 1000);
};

// Вызываем с аргументами
spawnChildProcess(['arg1', 'arg2', 'arg3']);

//node src/cp/cp
