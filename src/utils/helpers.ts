export function parseStringToJson<T>(input: string): T {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error("Error parsing string to JSON");
  }
}
