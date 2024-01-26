// n should be received from main thread

import * as fs from "node:fs";
import { workerData, parentPort } from 'worker_threads';
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {

    let n = Math.random;
    let myReadStream = fs.createReadStream(nthFibonacci(n));
    () => myReadStream.on('data', (data) => console.log(data.toString())) ;
};

parentPort.postMessage(nthFibonacci(workerData));

sendResult();