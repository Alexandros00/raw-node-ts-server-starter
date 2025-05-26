import http from "http";
import { handleProducts } from "./routes/products/products.js";
import productService from "./services/product/ProductService.js";

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from raw Node.js server!");
  } else if (req.url?.includes("/products")) {
    handleProducts(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3002, async () => {
  console.log("Server running at http://localhost:3002");
  await productService.init();
  console.log("DB is ready!");
});
