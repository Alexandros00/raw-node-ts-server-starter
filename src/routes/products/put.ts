import { IncomingMessage, ServerResponse } from "http";
import { getPathParts, parseJsonBody, sendJsonResponse } from "../../utils/httpUtils.js";
import productService from "../../services/product/ProductService.js";
import { HttpError } from "../HttpError.js";

export async function handleProductsPutRequest(req: IncomingMessage, res: ServerResponse) {
  const { resource: _resource, stringId } = getPathParts(req.url ?? "");

  const id = Number(stringId);

  const parsed = await parseJsonBody(req);
  try {
    const newProduct = await productService.putProduct(id, parsed);

    sendJsonResponse(res, 200, newProduct);
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
