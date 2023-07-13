//npm run wt

import os from 'os';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = 'worker.js';
const pathFile = path.join(__dirname, fileName);

const performCalculations = async () => {
    const numOfWorkers = os.cpus().length;
    const result = new Array(numOfWorkers).fill(null);
    let i = 10;

    const workersRes = await Promise.allSettled(
        result.map(() => new Promise((resolve, reject) => {
            const worker = new Worker(pathFile, { workerData: i++ });
            worker.on('message', (message) => {
                resolve(message);
            });
            worker.on('error', () => {
                reject(null);
            });
        })
        )
    )

    workersRes.map((el) => {
        el.status = el.status === 'fulfilled' ? 'resolved' : 'error';
        el.data = el.value ? el.value : el.reason;
        delete el.value;
        delete el.reason;
    });

    console.log(workersRes);

};


await performCalculations();