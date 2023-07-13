// n should be received from main thread

import { workerData, parentPort } from 'worker_threads';
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

import * as fs from "node:fs";

const sendResult = () => {

    let n = 10;
    let myReadStream = fs.createReadStream(nthFibonacci(n));
    () => myReadStream.on('data', (data) => console.log(data.toString())) ;
};

parentPort.postMessage(nthFibonacci(workerData));

sendResult();