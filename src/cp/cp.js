//npm run cp
//отправляем параметры в скрипт, он их обрабатывает

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { spawn } from 'child_process';

const pathToFile = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');
const { stdin, stdout } = process;

const spawnChildProcess = async (args) => {
    // Write your code here
    const process = spawn('node', [pathToFile, ...args]);
    stdin.on('data', (data) => {
        process.stdin.write(data);
    });
    process.stdout.on('data', (data) => {
        stdout.write(data);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['Argument1', 'Argument2', 'Argument3'] );

