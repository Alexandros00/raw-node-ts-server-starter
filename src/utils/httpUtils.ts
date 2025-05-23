import { IncomingMessage, ServerResponse } from "http";
const returnHeaderAppJson = { "Content-Type": "application/json" };

export async function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

export function sendJsonResponse(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, returnHeaderAppJson);
  res.end(JSON.stringify(data));
}

export function getPathParts(url: string): { resource: string; stringId?: string } {
  if (!url) throw new Error("Invalid URL");
  const [resource, stringId] = url.split("?")[0].split("/").filter(Boolean);
  return { resource, stringId };
}
