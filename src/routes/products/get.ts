import { IncomingMessage, ServerResponse } from "http";
import { getPathParts, sendJsonResponse } from "../../utils/httpUtils.js";
import productService from "../../services/product/ProductService.js";
import { HttpError } from "../HttpError.js";

export function handleProductsGetRequest(req: IncomingMessage, res: ServerResponse) {
  const { resource, stringId } = getPathParts(req.url ?? "");
  const id = Number(stringId);

  const isCollectionRequest = resource === "products" && !stringId;
  const isItemRequest = resource === "products" && Number.isInteger(id);

  try {
    if (isCollectionRequest) {
      sendJsonResponse(res, 200, productService.getAllProducts());
    } else if (isItemRequest) {
      sendJsonResponse(res, 200, productService.getProductById(id));
    } else {
      sendJsonResponse(res, 400, { error: "Bad request" });
    }
  } catch (error) {
    if (error instanceof HttpError) {
      sendJsonResponse(res, error.status, { error: error.message });
    } else {
      console.error("Unhandled error:", error);
      sendJsonResponse(res, 500, { error: "Internal server error" });
    }
  }
}
