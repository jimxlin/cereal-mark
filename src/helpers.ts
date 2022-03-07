import { sha256 } from "hash-wasm";
import typesTi from "./types-ti";
import { createCheckers } from "ts-interface-checker";

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

export const validateCollection = (obj: any): void => {
  const { Collection } = createCheckers(typesTi);
  Collection.check(obj);
};

export function readTextFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(file, "UTF-8");
  });
}
