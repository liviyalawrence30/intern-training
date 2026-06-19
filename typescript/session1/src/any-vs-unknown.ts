let dangerousValue: any = "hello";
dangerousValue = 42;
dangerousValue = { name: "Alice" };
console.log(dangerousValue.foo.bar); 
//error during runtime:Cannot read properties of undefined (reading 'bar')

let safeValue: unknown = "hello";
//console.log(safeValue.toUpperCase());
//error safeValue is of type unkonwn. 
if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase());//outputs "HELLO"
}
/*Type narrowing means reducing the unknown types using specific checks beforehand.
After checking alone, the actions are performed.*/


