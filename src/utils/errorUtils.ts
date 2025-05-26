import { HttpError } from "../routes/HttpError.js";

export function handleFsError(error: unknown, fallbackMessage = "File access error") {
  if (error instanceof Error && "code" in error) {
    if ((error as any).code === "ENOENT") {
      throw new HttpError("DB file not found", 500);
    }
  }
  if ((error as any).status === 404) {
    throw new HttpError("Product not found", 404);
  }
  throw new HttpError(fallbackMessage, 500);
}
