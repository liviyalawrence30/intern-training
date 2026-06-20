interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};
interface Product {
  readonly id: string;
  name: string;
  price: number;
  category: string;
};
interface OrderItem {
  product: Product;
  quantity: number;
};
interface Order {
  readonly id: string;
  customer: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
};
function calculateTotal(order: Order): number {
  let total = 0;
  for (const item of order.items) {
    total += item.product.price * item.quantity;
  }
  return total;
};
const address1: Address = {
  street: "6th",
  city: "coimbatore",
  state: "Tamil Nadu",
  country: "India",
  postalCode: "641035"
};

const product1: Product = {
  id: "P001",
  name: "Laptop",
  price: 50000,
  category: "Electronics"
};

const product2: Product = {
  id: "P002",
  name: "Mouse",
  price: 1000,
  category: "Accessories"
};

const order1: Order = {
  id: "O001",
  customer: "Maria Liviya",
  items: [
    { product: product1, quantity: 1 },
    { product: product2, quantity: 2 }
  ],
  shippingAddress: address1,
  status: "pending",
  createdAt: new Date()
};
console.log("Order total:", calculateTotal(order1));

/*An interface can reference itself.It can be used for tree or nested data.

interface TreeNode {
  value: string;
  children: TreeNode[];
};
const tree: TreeNode = {
  value: "Root",
  children: [
    {
      value: "Child 1",
      children: []
    },
    {
      value: "Child 2",
      children: [
        {
          value: "Grandchild",
          children: []
        }
      ]
    }
  ]
};
*/
