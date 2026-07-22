const fs = require('fs')


fs.writeFileSync('nodejs/session1/output.txt', 'Hello from Node.js file system!')
const content = fs.readFileSync('nodejs/session1/output.txt', 'utf8')
console.log("File content:", content)
fs.appendFileSync('nodejs/session1/output.txt', '\nThis line was appended.')
const updated = fs.readFileSync('nodejs/session1/output.txt', 'utf8')
console.log("Updated content:", updated)
/*
writeFileSync() creates a new file or overwrites the existing file with new content.
appendFileSync() adds new content to the end of an existing file without removing its current contents.
*/
