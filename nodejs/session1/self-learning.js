const fs = require("fs").promises;
const readline = require("readline");

async function main() {
    await fs.writeFile("sample.txt", "Hello from Node.js!\n");
    await fs.appendFile("sample.txt", "This is an appended line.\n");

    const data = await fs.readFile("sample.txt", "utf8");
    console.log(data);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter your name: ", (name) => {
        console.log(`Hello, ${name}!`);
        rl.close();
    });
}

main();