interface Person{
    firstName: string;
    lastName: string;
    email: string;
};
interface Employee extends Person{
    readonly employeeId: string;
    department: string;
    startDate: Date ;
};
interface Manager extends Employee{
    teamSize: number;
    directReports: string[]; 
};
function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
};
function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${employee.department}, joined on ${employee.startDate.toLocaleDateString()}`;
};
const person1: Person = {
  firstName: "Maria",
  lastName: "Liviya",
  email: "maria@example.com"
};
const employee1: Employee = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  employeeId: "EMP001",
  department: "Engineering",
  startDate: new Date("2024-01-01")
};

const manager1: Manager = {
  firstName: "Bob",
  lastName: "Smith",
  email: "bob@example.com",
  employeeId: "MGR001",
  department: "Engineering",
  startDate: new Date("2023-06-15"),
  teamSize: 5,
  directReports: ["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"]
};
console.log(getFullName(person1));
console.log(getFullName(employee1));
console.log(getFullName(manager1));
console.log(introduceEmployee(employee1));

/*
Here,inheritance is done. Full name is accepted by person ,manager and employee beacuse employee extends person and manager extends employee.
By this way,employee can have all the properties of person
manager can have all the properties of both person and employee.
*/


/*error for task 3.4
employee1.employeeId="EMP99";
error:Cannot overwrite  'employeeId' because it is a read-only property.*/
//fix:
employee1.firstName="Jack";
//Can change other parameters which are not read-only.
