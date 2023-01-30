import { checkStradivarius } from "./scrapingStradivarius";
import { checkZara } from "./scrapingZara";

export const scraping = async (product) => {
  let isAvailable = false;
  if (product.store === "zara") {
    isAvailable = await checkZara(product);
  } else {
    isAvailable = await checkStradivarius(product);
  }
  return isAvailable;
};
