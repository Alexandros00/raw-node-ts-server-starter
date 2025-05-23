export interface Product {
  id: number;
  name: string;
  price: number;
}

// TODO: Delete when start using DB
export const products: Product[] = [
  { id: 1, name: "Hammer", price: 9.99 },
  { id: 2, name: "Screwdriver", price: 5.49 },
];
