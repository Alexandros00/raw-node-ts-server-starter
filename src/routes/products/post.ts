import { IncomingMessage, ServerResponse } from "http";
import { parseJsonBody, sendJsonResponse } from "../../utils/httpUtils.js";
import { Product, products } from "../../product/interfaces/product.interface.js";

export async function handleProductsPostRequest(req: IncomingMessage, res: ServerResponse) {
  try {
    const parsed = await parseJsonBody(req);

    if (!parsed.name) {
      sendJsonResponse(res, 400, { error: "Invalid product name" });
      return;
    }
    if (typeof parsed.price !== "number" || parsed.price < 0) {
      sendJsonResponse(res, 400, { error: "Invalid product price" });
      return;
    }

    const newProduct: Product = {
      id: products.length + 1,
      name: parsed.name,
      price: parsed.price,
    };

    products.push(newProduct);

    sendJsonResponse(res, 201, newProduct);
  } catch (err: unknown) {
    if (err instanceof Error) {
      sendJsonResponse(res, 400, { error: err.message });
    } else {
      sendJsonResponse(res, 400, { error: err });
    }
  }
}
