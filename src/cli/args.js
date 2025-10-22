const parseArgs = () => {
  const args = process.argv.slice(2); 
  // пропускаем 'node' и название скрипта

  const result = [];
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, ''); 
    // удаляем префикс "--" регулярное выражение в начале строки
    const value = args[i + 1];
    result.push(`${key} is ${value}`);
  }

  console.log(result.join(', '));
  // масив в строку с разделителем
};

parseArgs();

// node src/cli/args.js --propName value --prop2Name value2