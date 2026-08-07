type Product = { name: string; price: number; rating: number; salesCount: number }

interface SortStrategy {
  sort(products: Product[]): Product[]
}

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}
class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
  }
}
class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating);
  }
}
class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.salesCount - a.salesCount);
  }
}
/*
Array.sort() modifies the original array .
Every other program that uses the same array gets changed. 

Returning a new array prevents these side effects 
It keeps the original array unchanged.

example bug:
const products = [
  { name: "Phone", price: 500 },
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 50 }
];
sortByPrice.sort(products);Original array is modified
console.log(products);
output:
mouse 
phone 
laptop

If another function expects the original order, this sorted array will be displayed.
*/

class ProductCatalogue {
  private strategy: SortStrategy
  constructor(strategy: SortStrategy) { this.strategy = strategy }
  setStrategy(strategy: SortStrategy): void { this.strategy = strategy }
  sort(products: Product[]): Product[] { return this.strategy.sort(products) }
}
class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price);
  }
}

const products: Product[] = [
  { name: 'Keyboard', price: 2499, rating: 4.3, salesCount: 1200 },
  { name: 'Monitor',  price: 18999, rating: 4.7, salesCount: 340 },
  { name: 'Headset',  price: 3499, rating: 4.1, salesCount: 870 },
  { name: 'Webcam',   price: 1999, rating: 3.9, salesCount: 2100 },
  { name: 'Mouse',    price: 899, rating: 4.5, salesCount: 3400 },
]

const catalogue = new ProductCatalogue(new SortByName())
console.log('By name:',       catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByPrice())
console.log('By price:',      catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByRating())
console.log('By rating:',     catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByPopularity())
console.log('By popularity:', catalogue.sort(products).map(p => p.name))

/*
The interface provides a common sort() method.
So it can be used just by changing the object. It provies reusability.

If I used if/else version here, I would need multiple conditions.
It makes the code larger and harder to maintain.
*/

catalogue.setStrategy(new SortByPriceDesc());
console.log(  "By price desc:",  catalogue.sort(products).map((p) => p.name));

/*
No existing code was modified.
If I have used if/else, I would need to modify the existing sort() method and another sorting logic. 
*/

type SortFn = (products: Product[]) => Product[]

const sortByName:  SortFn = p => [...p].sort((a, b) => a.name.localeCompare(b.name))
const sortByPrice: SortFn = p => [...p].sort((a, b) => a.price - b.price)

function applySort(products: Product[], fn: SortFn): Product[] {
  return fn(products)
}

console.log('\nFunction-based strategies:')
console.log('By name:', applySort(products, sortByName).map(p => p.name))
console.log('By price:', applySort(products, sortByPrice).map(p => p.name))

console.log('By rating inline:', applySort(products, p => [...p].sort((a, b) => b.rating - a.rating)).map(p => p.name))

/*
I would use a class based strategy instead of function based when I need to store data or have multiple methods.
eg: while calculating discount, I may need to store the default discount percentage, customer type etc.
*/
