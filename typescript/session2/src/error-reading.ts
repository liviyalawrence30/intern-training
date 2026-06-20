/*Error 1:
src/app.ts:8:15 - error TS2339:
Property 'username' does not exist on type 'User'.*/

//It means that the property 'username 'is trying to be accessed but it is not a property of the user.
interface User {
  name: string;
  age: number;
}
const user1: User = { name: "Maria", age: 20 };
//error:
//console.log(user1.username);
//fix:
console.log(user1.name);

/*Error 2:
src/app.ts:14:22 - error TS2345:
Argument of type 'string' is not assignable to parameter of type 'number'.*/

//the code is trying to pass a string value as argument to a parameter of type 'number' which causes error.
function square(num: number): number {
  return num * num;
};
//error:
//console.log(square("5"));
//fix:
console.log(square(5));

/*Error 3:
src/app.ts:21:3 - error TS7006:
Parameter 'data' implicitly has an 'any' type.*/

//It means the parameters tyoe and the reutrn type are not explicitly specified which makes them the type of 'any'.
//error:
/*function print(data){
    console.log(data);
};*/
//fix:
function print(data:string):void{
    console.log(data);
}


/*
Error 4:
src/app.ts:30:10 - error TS2532:
Object is possibly 'undefined'.*/

//the value for the object may not be present.So it may be undefined.
const words = ["apple", "banana", "orange"];
const firstWord = words[5];
//error:
//console.log(firstWord.toUpperCase());
//fix:
if (firstWord !== undefined) {
  console.log(firstWord.toUpperCase());
}

/*Error 5:
src/app.ts:38:5 - error TS2322:
Type 'string | undefined' is not assignable to type 'string'.*/
 
//In the below code, bio is optional. So profile may be undefined.
interface Profile {
  bio?: string;
}
const profile: Profile = {};
//error:
//const bioText: string = profile.bio;
//fix:
const bioText: string = profile.bio ?? "No bio provided";











