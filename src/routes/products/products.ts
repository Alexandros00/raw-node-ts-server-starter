import { IncomingMessage, ServerResponse } from "http";
import { handleProductsGetRequest } from "./get.js";
import { handleProductsPostRequest } from "./post.js";
import { handleProductsDeleteRequest } from "./delete.js";
import { handleProductsPutRequest } from "./put.js";
import { handleProductsPatchRequest } from "./patch.js";

export async function handleProducts(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "GET") {
    handleProductsGetRequest(req, res);
  } else if (req.method === "POST") {
    handleProductsPostRequest(req, res);
  } else if (req.method === "PUT") {
    handleProductsPutRequest(req, res);
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
}
