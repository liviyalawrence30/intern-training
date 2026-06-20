type Predicate<T> = (value: T) => boolean;
type Transform<T, U> = (value: T) => U;
type EventHandler = (eventName: string, payload: unknown) => void;

function filter<T>(items: T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate);
};
function transform<T, U>(items: T[], fn: Transform<T, U>): U[] {
  return items.map(fn);
};

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, (n) => n % 2 === 0);
const stringNumbers = transform(numbers, (n) => n.toString());
console.log(evenNumbers);
console.log(stringNumbers);


/*error for task 3.4
const wrongNumber=const wrongNumbers = transform(numbers, (n) => n * "2");
error: Expression expected.*/
//fix:
const wrongNumber= transform(numbers, (n) => n * 2);
