 console.log("TypeScript is running");
 //const age: number = "thirty";
 //error:Type 'string' is not assignable to type 'number'.
 const age:number=30;
 //tsc compiles and generates output files whereas tsc--noEmit does not generate output files but only checks for errors
 function add(a: number, b: number): number {
     return a + b;
   }
   console.log(add(2, 3));
   //The type annotations are removed in index.js
   //This shows that TypeScript's type safety exists only during development and compilation.
   