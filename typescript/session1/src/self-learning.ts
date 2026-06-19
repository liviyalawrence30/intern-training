function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
printId("149");
printId(115);
function printId2(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
printId2(123);
printId2("Second");


function sendRequest(method: "GET" | "POST"): void {
  console.log(`Method: ${method}`);
}
sendRequest("GET");
sendRequest("POST");
//sendRequest("PUT");
// //error "put" is not assignable to parameter of type "get or post".


const fruits: readonly string[] = ["apple", "banana", "orange"];
console.log(fruits[0]);
//fruits.push("grape");
//error: Property 'push' does not exist on type 'readonly string[]'.
/*The readonly keyword makes an array read-only.
Elements can be accessed but cannot be added, removed, or modified.
We use readonly when data should not change after it is created.*/

let name: string|null="maria";
console.log(name.toUpperCase());//outputs "MARIA"
name=null;
//console.log(name.toUpperCase());//error: 'name' is possible 'null'.











