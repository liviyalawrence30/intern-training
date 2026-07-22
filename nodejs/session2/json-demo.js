const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

const raw   = fs.readFileSync(filePath, 'utf8')
const users = JSON.parse(raw)

console.log('All users:', users)
console.log('Total:', users.length)

const top = users.filter(u => u.score >= 90)
console.log('Top scorers:', top.map(u => u.name))

const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length
console.log('Average score:', avg.toFixed(1))

/*
JSON.parse() is used to convert the JSON string into a JS object .
Withoud it, we cannot use the methods like map() or filter() or reduce().
*/

// Add a new user

const newUser = { id: 5, name: 'Vikram', role: 'intern', score: 88 }
users.push(newUser)

// Write back to file
const updated = JSON.stringify(users, null, 2)
fs.writeFileSync(filePath, updated)
console.log('User added and file updated')

// Verify
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log('Total after update:', verify.length)

/*
In JSON.stringify(users,null,2),
'null' says that there is nothing to filter or change.
'2' specifies the indentation so that the data is easier to read.
Without null,if there is no replacer, it acts same as null.
Without 2, there will be no space and everything will be in single line.
*/

const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const index = currentData.findIndex(u => u.name === 'Amit')
if (index !== -1) {
  currentData[index].score = 90
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
  console.log('Amit score updated to 90')
}
/*
find() returns the first matching element.
findIndex() returns the index of the first matching element.
when I need to update the element, I use findIndex() over find().
*/

