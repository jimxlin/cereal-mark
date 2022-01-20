import { sha256 } from "hash-wasm";

export const generateId = (): Promise<string> => {
  let uniqueId: string = Date.now().toString();
  uniqueId = uniqueId + navigator.userAgent;
  uniqueId = uniqueId + Math.floor(Math.random() * 1000).toString();
  return sha256(uniqueId);
};

// https://mathiasbynens.be/demo/url-regex -> @imme_emosol
export const validUrl = (url: string) => {
  const urlRegex = new RegExp("https?://(-.)?([^s/?.#-]+.?)+(/[^s]*)?$");
  return urlRegex.test(url);
};
