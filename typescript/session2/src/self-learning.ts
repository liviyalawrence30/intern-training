interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
};
function updateUser(user: User, updates: Partial<User>): User {
return { ...user, ...updates };
}
const user1: User = {
id: 1,
name: "Maria",
email: "maria@gmail.com",
role: "viewer"
};
const updatedUser = updateUser(user1, { name: "Liviya", age: 21 });
console.log(updatedUser);


type UserContact = Pick<User, "name" | "email">;
function sendWelcomeEmail(user1: UserContact): void {
console.log(`Welcome ${user1.name}, email sent to ${user1.email}`);
}


type NewUser = Omit<User, "id">;
function createUser(user: NewUser): User {
return {id: Math.floor(Math.random() * 1000),...user};
};
const newUser = createUser({
name: "John",
email: "john@gmail.com",
role: "editor"
});
console.log(newUser);


type RolePermissions = Record<User["role"], string[]>;
const permissions: RolePermissions = {
admin: ["create", "edit", "delete"],
editor: ["edit", "publish"],
viewer: ["read"]
};
function getPermissions(role: User["role"]): string[] {
return permissions[role];
};
console.log(getPermissions("admin"));
