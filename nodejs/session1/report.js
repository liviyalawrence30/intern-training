const fs = require("fs");
const dayjs = require("dayjs");

const data = fs.readFileSync("nodejs/session1/data.json", "utf8");
const users = JSON.parse(data).users;

const role = process.argv[2];

const filteredUsers = users.filter(user => user.role === role);

console.log("Report generated on:", dayjs().format("DD MMM YYYY"));
console.log("Role:", role);


filteredUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (ID: ${user.id})`);
});


console.log(`Total: ${filteredUsers.length} user(s) found`);
