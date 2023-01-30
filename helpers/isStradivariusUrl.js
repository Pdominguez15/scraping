export const isStradivariusUrl = (url) => {
  const regexStradivarius = new RegExp(
    /https:\/\/www.stradivarius.com\/es\/[a-z-]+-l[0-9]+/
  );

  return regexStradivarius.test(url);
};
