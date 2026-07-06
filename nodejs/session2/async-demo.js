const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Synchronous
console.log('1 — before sync read')
const data = fs.readFileSync(filePath, 'utf8')
console.log('2 — sync read done:', data.split('\n').length, 'lines')
console.log('3 — after sync read')

console.log('---')

// Asynchronous
console.log('4 — before async read')
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err
  console.log('6 — async read done:', data.split('\n').length, 'lines')
})
console.log('5 — after async read (does not wait)')

/*
Synchronous methods block the execution of code until the operation is completed.
So the order is 1,2,3.
Asynchronous methods do not block the code execution.The next line of code gets executed while the operation is still in progress.
The callback function is called when the operation is completed.
so, the order is 4,5 and then 6.
By this way, multiple requests can be handled concurrently using asynchronous methods.*/

