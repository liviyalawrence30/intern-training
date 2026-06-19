function multiply(a:number, b:number):number {
  return a * b;
}
function formatName(firstName:string, lastName:string):string {
  return `${firstName} ${lastName}`;
}

function isAdult(age:number):boolean {
  return age >= 18;
}

function getFirstElement(arr:number[]):number|undefined {
  return arr[0];
}

//multiply(2,"3");
//error: string cannot be assigned to a paramter of type "number".
//formatName("Maria");
//error:Expected 2 arguments, but got 1.
//isAdult(false);
//error:Argument of type 'boolean' is not assignable to parameter of type 'number'.
//getFirstElement(["apple","banana"]);
//error: Type 'string' is not assignable to type 'number'.


