import { sha256 } from "hash-wasm";

export const generateId = (): Promise<string> => {
  let uniqueId: string = Date.now().toString();
  uniqueId = uniqueId + navigator.userAgent;
  uniqueId = uniqueId + Math.floor(Math.random() * 1000).toString();
  return sha256(uniqueId);
};

export const toUndefined = (value: any): any => {
  if (typeof value === "string" && value.length === 0) return undefined;
  return value;
};
