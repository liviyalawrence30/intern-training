console.log("Hello");

const name="Maria Liviya";
const age=20;
let role="Intern";
let isAvailable=true;
console.log("name is a "+typeof name);
console.log("age is a "+typeof age);
//name="Maria";
//TypeError: Assignment to constant variable.


console.log(`Hi, I'm ${name} and I'm an ${role}.`);
console.log(`Available: ${isAvailable}`);
console.log(`My name has ${name.length} characters.`);


const fullName=(first,last)=>`${first} ${last}`;
console.log(fullName("Alice","Johnson"));
const isAdult=(age)=>age>=18;
console.log(isAdult(20));
const formatUser=(user)=>`${user.name} - ${user.role}`;
const User={
    name:"Alice",
    role:"dev"
};
console.log(formatUser(User));


const user = {
  id: 1,
  name: "Alice",
  role: "dev",
  active: true,
  address: {
    city: "Mumbai",
    country: "India"
  }
};
const{name :userName,role:userRole,active}=user;
console.log(userName);
console.log(userRole);
console.log(active);
const{address:{city}}=user;
console.log(city);
const updatedUser={...user,active:false};
console.log(updatedUser);


const devs = ["Alice", "Carol"];
const designers = ["Bob", "Dan"];
const team=[...devs,...designers];
console.log(team);
const updateTeam=[...team,"Eve"];
console.log(updateTeam);
const {firstmember,secondmember}=team;
console.log(firstmember);
console.log(secondmember);


const users = [
  { id: 1, name: "Alice", role: "dev",    active: true  },
  { id: 2, name: "Bob",   role: "design", active: false },
  { id: 3, name: "Carol", role: "dev",    active: true  },
  { id: 4, name: "Dan",   role: "design", active: true  },
  { id: 5, name: "Eve",   role: "dev",    active: false },
];
const activeUsers=users.filter(user=>user.active).map(user=>user.name);
console.log(activeUsers);
const devUsers=users.filter(user=>user.role ==="dev");
console.log(devUsers);
const description=users.map(user=>`${user.name} is a ${user.role}`);
console.log(description);
const activeDevs=users.filter(user=>user.active && user.role==="dev").map(user=>user.name);
console.log(activeDevs);


const Users = [
  { id: 1, name: "Alice", role: "dev",    active: true  },
  { id: 2, name: "Bob",   role: "design", active: false },
  { id: 3, name: "Carol", role: "dev",    active: true  },
  { id: 4, name: "Dan",   role: "design", active: true  },
  { id: 5, name: "Eve",   role: "dev",    active: false },
];
const roleCount=users.reduce((count,user)=>{
    count[user.role]=(count[user.role]||0)+1;
    return count;
},{});
console.log(roleCount);
const activeDesigner=users.find(user=>user.active && user.role==="design");
console.log(activeDesigner);
const hasInactiveuser=users.some(user=>!user.active);
console.log(hasInactiveuser);
const allHaveRole=users.every(user=>user.role);
console.log(allHaveRole);


const input = "5";
const score = 5;
if (input == score) {
  console.log("match");   // this prints — should it?
};
// here the input variable is a string and score is a number. while using loose equality , the string is automatically converted to number. so it prints match .To avoid this ,we can use strict equality(===)
/*
const input = "5"
const score = 5
if (input === score) {
  console.log("match");   // this prints — should it?
};
*/
/*
const doubled = [1, 2, 3].map(n => {
  n * 2;
});
console.log(doubled) ;
*/
const doubled = [1, 2, 3].map(n => {
  return n * 2;
});
/*
console.log(doubled);
const original = [1, 2, 3];
original.push(4);
console.log(original);
*/
const original = [1, 2, 3];
const updated=[...original,4];
console.log(updated);
console.log(original);//to check 
const user1 = { name: "Alice", active: true };
user1.active = false ;   
console.log(user1);
//It doesnt throw an error beacuse the proper inside the user object is changed but not what the user object points to.
//user = { name: "Bob" };//TypeError : assignment to constant variable.


const Username = "Alice";
const username = "Bob";
console.log(Username);//Alice logs
console.log(username);// Bob logs
const a = null;
const b = undefined;
console.log(typeof a);
console.log(typeof b);
//null is an intentional absence of any object value and typeof null returns "object" which is a known bug in JavaScript. 
//undefined means a variable has been declared but has not been assigned a value, and typeof undefined returns "undefined".
/* cannot access greet before initialization. so the below snippet doesn't work
console.log(greet("Alice"));
const greet = (name) => `Hello, ${name}`;
*/
const greet = (name) => `Hello, ${name}`;
console.log(greet("Alice"));
//It works now beacuse the function greet is called after initialization.





