import { IncomingMessage, ServerResponse } from "http";
import { products } from "../../product/interfaces/product.interface";
import { getPathParts, sendJsonResponse } from "../../utils/httpUtils";

export function handleProductsGetRequest(req: IncomingMessage, res: ServerResponse) {
  const { resource, stringId } = getPathParts(req.url ?? "");
  const id = Number(stringId);

  if (resource === "products" && !stringId) {
    sendJsonResponse(res, 200, products);
  } else if (resource === "products" && Number.isInteger(id)) {
    const product = products.find((p) => p.id === id);

    if (product) {
      sendJsonResponse(res, 200, product);
    } else {
      sendJsonResponse(res, 404, { error: "Product not found" });
    }
  } else {
    sendJsonResponse(res, 400, { error: "Bad request" });
  }
}
