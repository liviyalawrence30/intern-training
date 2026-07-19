const os = require('os')

console.log('Platform:     ', os.platform())
//It returns the OS platform (output: win32)
console.log('Architecture: ', os.arch())
//It returns the OS architecture(output: x64)
console.log('Hostname:     ', os.hostname())
//It returns the hostname of the OS(Hostname:liviya)
//It is useful for identifying the machine on which the code is running over a network.
console.log('Home dir:     ', os.homedir())
//It returns the home directory of the current user(Home dir: C:\Users\liviy).
console.log('CPU cores:    ', os.cpus().length)
//It returns the number of CPU cores available on the machine(CPU cores:16).

const totalMB = Math.round(os.totalmem() / 1024 / 1024)
const freeMB  = Math.round(os.freemem()  / 1024 / 1024)
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`)
//It returns the total memory and free memory available in MB(Memory: 3789MB free of 16069MB).

const platform = os.platform()

if (platform === 'win32') {
  console.log('Running on Windows')
} else if (platform === 'darwin') {
  console.log('Running on Mac')
} else {
  console.log('Running on Linux')
}

const freePercent = Math.round((os.freemem() / os.totalmem()) * 100)
if (freePercent < 20) {
  console.log('Warning: Low memory —', freePercent + '% free')
} else {
  console.log('Memory OK —', freePercent + '% free')
}
/*
Real-World Example:
A Node.js app can check the process.platform to run the OS commands.
Eg:Windows - "copy", Linux = "cp"
*/
