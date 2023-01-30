export const isZaraUrl = (url) => {
  const regexZara = new RegExp(
    /https:\/\/www.zara.com\/(es|ES)\/es\/[a-z-]+-p[0-9]+\.html/
  );

  return regexZara.test(url);
};
