const fruits:string[] = ["apple", "banana", "cherry"];
const temperatures:number[] = [22.5, 19.0, 30.1];
const flags:Array<boolean> = [true, false, true];
/*
fruits.push(42);//Error: Argument of type 'number' is not assignable to parameter of type 'string'.
temperatures.push("hot");//Error: Argument of type 'string' is not assignable to parameter of type 'number'.
*/

/*
const mixed: (string | number)[] = ["Alice", 1, "Bob", 2];
mixed.push(true); 
It doent work . Reason: Boolean cannot be pushed into an array of type string|number.
*/ 

/*
In TypeScript, string[] and Array<string> are fully interchangeable when defining basic types. 
Both enforce an array of strings. The key difference is purely syntactic: string[] is a concise array type, while Array<string> is a generic type.
*/
