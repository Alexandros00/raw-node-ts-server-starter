import { IncomingMessage, ServerResponse } from "http";
import { handleProductsGetRequest } from "./get.js";
import { parseJsonBody } from "../../utils/httpUtils.js";
import { Product, products } from "../../product/interfaces/product.interface.js";

export async function handleProducts(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "GET") {
    handleProductsGetRequest(req, res);
  } else if (req.method === "POST") {
    try {
      const parsed = await parseJsonBody(req);

      if (!parsed.name || typeof parsed.price !== "number") {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid product data");
        return;
      }

      const newProduct: Product = {
        id: products.length + 1,
        name: parsed.name,
        price: parsed.price,
      };

      products.push(newProduct);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newProduct));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON");
    }
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
}
