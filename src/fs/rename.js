import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const folder = path.join(__dirname, 'files');
  const from = path.join(folder, 'wrongFilename.txt');
  const to = path.join(folder, 'properFilename.md');

  try {
    await fs.access(from);
    try {
      await fs.access(to);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    await fs.rename(from, to);
    console.log('File renamed successfully!');
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();
