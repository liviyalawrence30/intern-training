const userRecord: [string, number, boolean] = ["Alice", 30, true];
console.log(userRecord[0].toUpperCase()); 
console.log(userRecord[1].toFixed(2));
console.log(userRecord[2].toString()); 
//no error while compilation of the above

//const wrongOrder: [string, number, boolean] = [30, "Alice", true]; 
//Error:Type 'string' is not assignable to type 'number'.
//// Type 'number' is not assignable to type 'string'.

const coordinates: [number, number] = [19.076, 72.877];

//const wrongTuple:[string,number,boolean] =["maria",20,true,"cse"];
/*error occurs - Type '[string, number, true, string]' is not assignable to type '[string, number, boolean]'.
source has 4 elements but target has only 3. 
Tuples have a fixed number of elements and a fixed type for each position. */




