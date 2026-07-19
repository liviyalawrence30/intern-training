const path = require('path')

console.log("Directory name:", __dirname)
console.log("File name:", __filename)

const joined = path.join(__dirname, 'data', 'users.json')
console.log("Joined path:", joined)

console.log("Extension:", path.extname('index.html'))
console.log("Basename:", path.basename('/users/rahul/notes.txt'))
console.log("Dirname:", path.dirname('/users/rahul/notes.txt'))


//path.join() combines file paths safely using the correct separator for the operating system. 
// It is more reliable than manually concatenating strings.

