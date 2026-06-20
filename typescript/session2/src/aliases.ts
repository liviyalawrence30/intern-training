type UserId = string;
type ProductId = string;
type Timestamp = number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";
function getUserById(id: UserId): void {
  console.log(`Getting user with ID: ${id}`);
};
function updateStatus(id: UserId, status: Status): void {
  console.log(`Updating user ${id} to status: ${status}`);
};
function move(direction: Direction, steps: number): void {
  console.log(`Moving ${steps} steps towards ${direction}`);
}
getUserById("hello");
//It does not provide any error.
getUserById("");
//The above null string doesn't provide any error too.

/*Typescript uses structural typing so it checks only by the type,not by their name.
UserId and ProductId are both strings.TypeScript treats them as compatible.
This can be a limitation because we may accidentally use a ProductId where a UserId is expected.*/


/*error for task 3.4
move("up", 5);
error:Argument of type '"up"' is not assignable to parameter of type 'Direction'.*/
//fix:
move("north",5);

