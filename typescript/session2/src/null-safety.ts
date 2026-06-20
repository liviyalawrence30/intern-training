/*function getFirstWord(sentence: string | null): string {
  return sentence.split(" ")[0];
}*/
//error: Type 'string | undefined' is not assignable to type 'string'.
//'sentence' is possibly 'null'.
function getFirstWord(sentence: string | null): string {
  if (sentence === null) {
    return "";
  }
  return sentence.split(" ")[0] ?? "";
};
/* If the sentence is null, the code will crash when trying to use split().
So we check for null first and return an empty string safely. */

/*
function getUserAge(user: { name: string; age?: number }): string {
  return `${user.name} is ${user.age.toString()} years old`;
}
  error:'user.age' is possibly 'undefined'.*/
function getUserAge(user: { name: string; age?: number }): string {
  if (user.age === undefined) {
    return `${user.name} age is not provided`;
  }
  return `${user.name} is ${user.age.toString()} years old`;
};
//we check for the undefined condition first then return the string.
//The program will crash if the bug hadn't been fixed.


const config = {
  database: {
    host: "localhost",
    port: 5432
  }
};
function getDbPort(): number {
  return config.database.port;
};
//No error.

/*
const users = ["Alice", "Bob", "Charlie"];
function findUser(name: string): string {
  const found = users.find(u => u === name);
  return found.toUpperCase();
}
error:'found' is possibly 'undefined'.*/
const users = ["Alice", "Bob", "Charlie"];
function findUser(name: string): string {
  const found = users.find((u) => u === name);
  if (found === undefined) {
    return "USER NOT FOUND";
  }
  return found.toUpperCase();
};
//We check for the undefined condition to avoid the crashing of the program during runtime.
