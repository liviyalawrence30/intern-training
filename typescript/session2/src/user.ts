interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
};
const user1: User = {
  id: 1,
  name: "Maria",
  email: "maria@gmail.com",
  age: 30,
  role: "admin"
};
const user2: User = {
  id: 2,
  name: "Rahul",
  email: "rahul@gmail.com",
  role: "editor"
};
const user3:User={
    id:3,
    name:"Lisa",
    email:"lisa@gmail.com",
    role:"viewer"

};
/*
const wronguser:User={
    id:4,
    name:"Jack",
    email:"jack@gmail.com",
    age:25,
    role:"superuser"
    //error:Type '"superuser"' is not assignable to type '"admin" | "editor" | "viewer"'.
};
*/

//user3.id=5;
//error:Cannot assign to 'id' because it is a read-only property.

/*Using readonly ensures that the property "id" is not changed later on . 
even if accidentally someone changes the property,error is shown.*/






