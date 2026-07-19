const path = require('path')

console.log('Current directory:', __dirname)
//It provides the absolute path of the current folder where the file is located.
//Useful when accessing files relative to the current script.

console.log('Current file:     ', __filename)
//It returns the absolute path of the current file being executed. 
// It is useful for indentifying the currently executing file and for debugging purposes.

const filePath = path.join(__dirname, 'data', 'users.json')
console.log('Joined path:', filePath)
//The joined path is displayed which has the current directory,data folder and a users.json file.

console.log('Basename:', path.basename('/home/user/notes.txt'))
//It returns only a file name from the given path.
//It is useful when I need just the file name.

console.log('Extension:', path.extname('index.html'))
//It returns the file extension.
//It is useful when I need to check the type of the file.

console.log('Dirname:  ', path.dirname('/home/user/notes.txt'))
//It returns the directory name from a given path.
//It is useful when I need to know the parent directory of a file.

// Manual string concatenation — fragile
const manual = __dirname + '/data/users.json'
console.log('Manual:    ', manual)

// path.join() — safe across all operating systems
const joined = path.join(__dirname, 'data', 'users.json')
console.log('path.join: ', joined)

// path.resolve() — always returns an absolute path
const resolved = path.resolve('data', 'users.json')
console.log('Resolved:  ', resolved)

/*
path.join() joins the segments and returns a relative path.
path.resolve() always returns an absolute path.
It resolves the path segments until the absolute path is reached.*/


