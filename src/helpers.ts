// https://mathiasbynens.be/demo/url-regex -> @imme_emosol
export const validUrl = (url: string) => {
  const urlRegex = new RegExp("https?://(-.)?([^s/?.#-]+.?)+(/[^s]*)?$");
  return urlRegex.test(url);
};
