import { sha256 } from "hash-wasm";

export const generateId = async (): Promise<string> => {
  let uniqueId: string = Date.now().toString();
  uniqueId = uniqueId + navigator.userAgent;
  uniqueId = uniqueId + Math.floor(Math.random() * 1000).toString();
  const hash = await sha256(uniqueId);
  return hash.slice(31);
};

export const toUndefined = (value: any): any => {
  if (typeof value === "string" && value.length === 0) return undefined;
  return value;
};

const DATE_LOCALE = "en-US";

const DATE_OPTIONS: any = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const humanDate = (ms: number): string =>
  new Date(ms).toLocaleString(DATE_LOCALE, DATE_OPTIONS);
