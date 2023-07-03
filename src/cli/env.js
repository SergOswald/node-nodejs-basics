const parseEnv = () => {
const RSS_name1 = process.env.RSS_foo;
const RSS_name2 = process.env.RSS_bar;
console.log("RSS_name1 =",`${RSS_name1}`);
console.log("RSS_name2 =",`${RSS_name2}`);
};

parseEnv();