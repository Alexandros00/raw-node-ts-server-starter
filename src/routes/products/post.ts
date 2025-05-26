import { IncomingMessage, ServerResponse } from "http";
import { parseJsonBody, sendJsonResponse } from "../../utils/httpUtils.js";
import productService from "../../services/product/ProductService.js";
import { HttpError } from "../HttpError.js";

export async function handleProductsPostRequest(req: IncomingMessage, res: ServerResponse) {
  try {
    const parsedNewProduct = await parseJsonBody(req);

    const newProduct = await productService.postProduct(parsedNewProduct);
    if (!newProduct) {
      sendJsonResponse(res, 500, { error: "Failed to save product" });
      return;
    }
    sendJsonResponse(res, 201, newProduct);
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      sendJsonResponse(res, err.status, { error: err.message });
    } else if (err instanceof Error) {
      sendJsonResponse(res, 500, { error: err.message });
    } else {
      sendJsonResponse(res, 500, { error: String(err) });
    }
  }
}
