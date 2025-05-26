import { Product } from "../../product/interfaces/product.interface.js";
import { HttpError } from "../../routes/HttpError.js";
import { handleFsError } from "../../utils/errorUtils.js";
import { parseStringToJson } from "../../utils/helpers.js";
import { ProductInMemory } from "./ProductInMemory.js";
import fs from "fs/promises";

class ProductService extends ProductInMemory {
  private _productsFileName: string = "src/data/products.json";

  getAllProducts(): Product[] {
    return this.getAllFromMemory();
  }

  getProductById(id: number): Product | undefined {
    if (id < 0) throw new HttpError("Invalid ID", 400);

    const product = this.getById(id);

    if (product) {
      return product;
    } else {
      throw new HttpError("Product not found", 404);
    }
  }

  private async fetchProducts(): Promise<Product[] | undefined> {
    try {
      const data = await fs.readFile(this._productsFileName, "utf-8");
      return data.length > 0 ? parseStringToJson<Product[]>(data) : [];
    } catch (error: unknown) {
      handleFsError(error, "Error reading DB file");
    }
  }

  async postProduct(product: Product): Promise<Product | undefined> {
    if (!product.name) {
      throw new HttpError("Invalid product name", 400);
    }
    if (typeof product.price !== "number" || product.price < 0) {
      throw new HttpError("Invalid product price", 400);
    }
    const newProduct = this.saveItem(product);

    try {
      await fs.writeFile(this._productsFileName, JSON.stringify(this.getAllFromMemory()), "utf-8");
      return newProduct;
    } catch (error) {
      handleFsError(error, "Error writing in DB file");
    }
  }

  async putProduct(id: number, product: Product): Promise<Product | undefined> {
    if (!Number.isInteger(id) && id < 0) {
      throw new HttpError("Invalid ID", 400);
    }
    if (!product.name) {
      throw new HttpError("Invalid product name", 400);
    }
    if (typeof product.price !== "number" || product.price < 0) {
      throw new HttpError("Invalid product price", 400);
    }

    try {
      const productIndex = this.getAllProducts().findIndex((p) => p.id === id);
      if (productIndex >= 0) {
        const newProduct = this.updateItem(productIndex, { id, ...product });
        await fs.writeFile(this._productsFileName, JSON.stringify(this.getAllFromMemory()), "utf-8");
        return newProduct;
      } else {
        throw new HttpError("Product not found", 404);
      }
    } catch (error) {
      handleFsError(error, "Error writing in DB file");
    }
  }

  async deleteProduct(id: number): Promise<void> {
    if (!Number.isInteger(id) && id < 0) {
      throw new HttpError("Invalid ID", 400);
    }

    try {
      const productIndex = this.getAllProducts().findIndex((p) => p.id === id);
      if (productIndex >= 0) {
        this.deleteItem(productIndex);

        await fs.writeFile(this._productsFileName, JSON.stringify(this.getAllFromMemory()), "utf-8");
      } else {
        throw new HttpError("Product not found", 404);
      }
    } catch (error) {
      handleFsError(error, "Error writing in DB file");
    }
  }

  async init() {
    console.log("INIT");
    const products = await this.fetchProducts();
    this.saveAllToMemory(products ?? []);
  }
}

export default new ProductService();
