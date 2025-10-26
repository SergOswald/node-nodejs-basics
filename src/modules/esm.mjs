// Import built-in modules using ES Module syntax
import path from 'path';
import os from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';

// Resolve __filename and __dirname equivalents in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import a JS file (executed for side effects only, no exports)
import './files/c.js';

// Generate a random number between 0 and 1
const random = Math.random();

// Declare variable to hold imported JSON data
let unknownObject;

// Dynamically import one of two JSON files depending on random value
if (random > 0.5) {
  // "assert { type: 'json' }" tells Node to treat file as JSON module
  unknownObject = await import('./files/a.json', { assert: { type: 'json' } });
} else {
  unknownObject = await import('./files/b.json', { assert: { type: 'json' } });
}

// Log some OS and path information
console.log(`Release ${os.release()}`);
console.log(`Version ${os.version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

// Create an HTTP server
const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

// Log the imported JSON object (must access `.default` when using import assertions)
console.log(unknownObject.default);

// Start the server
myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

// Export objects for use in other modules
export { unknownObject, myServer };
