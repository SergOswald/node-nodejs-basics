import { argv } from "node:process";

const parseArgs = () => {
  const [...args] = argv;
  for(let i=0; i<args.length; i=i+2) {
    console.log(args[i] + " is " + args[i+1]);
  };
};

parseArgs();