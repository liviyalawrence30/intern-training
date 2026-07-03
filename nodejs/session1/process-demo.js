console.log("Node version:", process.version)
// Displays the current Node.js version. 
// Useful for checking compatibility with project dependencies.
console.log("Platform:", process.platform)
// Displays the operating system platform. 
// Useful for writing cross-platform code and handling OS-specific functionality.
console.log("Current directory:", process.cwd())
// Displays the current working directory of the Node.js process. 
// Useful for file path management and debugging.
console.log("Memory usage:", process.memoryUsage())
//Displays memory usage statistics of the current Node.js process. 
//Useful for monitoring performance and detecting memory leaks.

const args = process.argv
console.log("All arguments:", args)
console.log("Your input:", args[2])

/*Real-world example:
A file processing script can accept a filename as an argument and process that file without requiring any changes to the script itself.
*/

console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("HOME:", process.env.HOME || process.env.USERPROFILE)

/*
Real applications store database URLs and API keys in environment variables instead of hardcoding them to keep sensitive information secure,
prevent secrets from being exposed in the source code, 
and allow for different configurations for development, testing, and production environments without changing the code.*/




