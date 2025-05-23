import { IncomingMessage, ServerResponse } from "http";
import { handleProductsGetRequest } from "./get.js";
import { handleProductsPostRequest } from "./post.js";

export async function handleProducts(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "GET") {
    handleProductsGetRequest(req, res);
  } else if (req.method === "POST") {
    handleProductsPostRequest(req, res);
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
}
