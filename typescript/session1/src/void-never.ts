function logEvent(event: string): void {
  console.log(`[LOG] ${event}`);
}
const result = logEvent("user_login");
console.log(result);//value of resut is "undefined".


function fail(message: string): never {
  throw new Error(message);
}
/*
function doSomething(): void {
  return "hello";
}
error:Type 'string' is not assignable to type 'void'. 
we gave the return type as void but are asking the function to return a string ,so error occurs.
*/


/*
function exitApplication(message: string): never {
  console.error(message);
  process.exit(1);
}

This function returns 'never' because process.exit() terminates the application immediately.Control never returns to the caller.
*/
