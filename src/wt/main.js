//npm run wt

import os from 'os';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const pathFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'worker.js');

const performCalculations = async () => {
    const result = new Array(os.cpus().length).fill(null);
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