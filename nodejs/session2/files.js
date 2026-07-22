const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Write
fs.writeFileSync(filePath, 'Line 1 — written by Node.js')
console.log('File written')

// Read
const content = fs.readFileSync(filePath, 'utf8')
console.log('Content:', content)

// Append
fs.appendFileSync(filePath, '\nLine 2 — appended')
fs.appendFileSync(filePath, '\nLine 3 — appended again')

// Read again
const updated = fs.readFileSync(filePath, 'utf8')
console.log('Updated:\n', updated)

/*
writeFileSync() creates a new file and write the content or overwrites the existing content in a file.
appendFileSync() appends the new content at the end of the existing content in a file. It doesn't overwrite.
*/

const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

/*
fs.readFileSync(path.join(__dirname, 'not-exist.txt'), 'utf8');
Error:no such file or directory.
Solution:
I need to check the existence of the file first using existsSync() method before reading this file.
Or try- catch block can also be used.
*/
