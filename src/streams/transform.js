import { Transform } from 'stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().trim().split('').reverse().join('');
      this.push(reversed + '\n');
      callback();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();

// node src/streams/transform
// вводим в консоль и тут же выводим реверс