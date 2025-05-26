import { IncomingMessage, ServerResponse } from "http";
import { getPathParts, sendJsonResponse } from "../../utils/httpUtils.js";
import productService from "../../services/product/ProductService.js";
import { HttpError } from "../HttpError.js";

export async function handleProductsDeleteRequest(req: IncomingMessage, res: ServerResponse) {
  const { stringId } = getPathParts(req.url ?? "");

  const id = Number(stringId);

  try {
    await productService.deleteProduct(id);
    sendJsonResponse(res, 200, { message: "Resource deleted" });
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      sendJsonResponse(res, error.status, { error: error.message });
    } else if (error instanceof Error) {
      sendJsonResponse(res, 500, { error: error.message });
    } else {
      sendJsonResponse(res, 500, { error: String(error) });
    }
  }
}
