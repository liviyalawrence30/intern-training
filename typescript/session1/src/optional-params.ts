function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}
greetUser("Alice"); 
greetUser("Alice", "Dr.");

function createAccount(email: string, role: string="user"): object {
  return { email, role };
}

createAccount("alice@example.com");
createAccount("bob@example.com", "admin");
/*An optional parameter may be undefined if no value is passed.
A default parameter automatically uses the default value when no argument is provided.
We can use an optional parameter when it is acceptable for the value to be missing.
we can use a default parameter when the function should always have a usable value.*/
