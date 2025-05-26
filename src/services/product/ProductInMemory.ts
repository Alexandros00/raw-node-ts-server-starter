import { Product } from "../../product/interfaces/product.interface.js";

export class ProductInMemory {
  private _products: Product[] = [];

  protected getAllFromMemory(): Product[] {
    return this._products;
  }

  protected getById(id: number): Product | undefined {
    if (id < 0) throw new Error("Invalid ID");

    return this._products.find((p) => p.id === id);
  }

  protected saveItem(product: Product): Product {
    const newProduct: Product = {
      id: this._products.length + 1,
      ...product,
    };
    this._products.push(newProduct);
    return newProduct;
  }

  protected updateItem(index: number, product: Product): Product {
    this._products[index] = product;
    return this._products[index];
  }

  protected deleteItem(index: number): void {
    this._products.splice(index, 1);
  }

  protected saveAllToMemory(products: Product[]): void {
    this._products = products;
  }
}
