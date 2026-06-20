function describe(value: string | number | boolean | null): string {
  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }
  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }
  if (typeof value === "boolean") {
    return `Boolean: ${value}`;
  }
  return "No value provided";
};

interface Cat { meow(): void; }
interface Dog { bark(): void; }
function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
};

function summarise(input: string | number[] | { label: string }): string {
  if (typeof input === "string") {
    return `String: ${input}`;
  }
  if (Array.isArray(input)) {
    return `Array length: ${input.length}`;
  }
  return `Label: ${input.label}`;
};


interface Cat2 {
  kind: "cat";
  meow(): void;
}
interface Dog2 {
  kind: "dog";
  bark(): void;
}
type Animal = Cat2 | Dog2;
function makeSound2(animal: Animal): void {
  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
};
//Discriminated unions are more reliable beacuse they use a fixed common property,instead of checking whether a property exists.

