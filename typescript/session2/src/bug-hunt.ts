interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}
/*
// Bug 1
function applyDiscount(product: Product): number {
  return product.price - product.discount;
}
// Bug 2
function getTagSummary(product: Product): string {
  return product.tags.join(", ").toUppercase();
}

// Bug 3
function createProduct(name, price): Product {
  return {
    id: Math.random().toString(),
    name: name,
    price: price,
    tags: []
  };
}

// Bug 4
function findCheapest(products: Product[]): Product {
  const sorted = products.sort((a, b) => a.price - b.price);
  return sorted[0];
}

// Bug 5
function printProduct(product: Product): void {
  console.log(`${product.name} costs ${product.price}`);
  return product.name;
}
*/

//Bug 1 error:'product.discount' is possibly 'undefined'.
//bug 2 error:Property 'toUppercase' does not exist on type 'string'.
//bug 3 error: Parameter 'name' and 'price' implicitly has an 'any' type.
//bug 4 error: Type 'Product | undefined' is not assignable to type 'Product'.
//bug 5 error:Type 'string' is not assignable to type 'void'.

//fixed code:
function applyDiscount(product: Product): number {
  return product.price - (product.discount ?? 0);
};
//if discount is undefined,it causes error. so 0 is used when no discount is provided.

function getTagSummary(product: Product): string {
  return product.tags.join(", ").toUpperCase();
};
//toUpperCase() is the correct string method.

function createProduct(name: string, price: number): Product {
  return {
    id: Math.random().toString(),
    name: name,
    price: price,
    tags: []
  };
};
//without explicitly giving types, they may hold 'any' or other wrong types.
//So explicity type is given to avoid creation of invalid product objects.

function findCheapest(products: Product[]): Product | undefined {
  const sorted = products.sort((a, b) => a.price - b.price);
  return sorted[0];
};
//if the product[] array is empty,sorted[0] will be undefined.
//Returning Product directly would be unsafe.

function printProduct(product: Product): void {
  console.log(`${product.name} costs ${product.price}`);
};
//the function return type is declared as void,so the function can't return values.
//So returning name will cause error.



//comment for tas 3.4
/*
We run typecheck while writing code, after fixing errors, and before committing or pushing code.
It helps catch TypeScript mistakes early without generating JavaScript files.
*/
