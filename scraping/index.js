import fetch from "node-fetch";
import cron from "node-cron";
import { sendMessageToTelegramBot } from "../telegram/sendMessage.js";

const URL =
  "https://www.stradivarius.com/itxrest/2/catalog/store/54009550/50331075/category/0/product/320115777/detail?languageId=-5&appId=1";

const scrape = async (url) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      Connection: "keep-alive",
    },
  });
  const json = await res.json();
  return json;
};

const getProduct = async () => {
  const json = await scrape(URL);
  const detail = json.detail.colors;
  const model = detail[1];

  const SIZE_35_1 = model.sizes[0].visibilityValue;
  const SIZE_35_2 = model.sizes[1].visibilityValue;

  return SIZE_35_1 !== "SOLD_OUT" || SIZE_35_2 !== "SOLD_OUT";
};

cron.schedule("*/5 * * * *", async () => {
  const isAvailable = await getProduct();
  sendMessageToTelegramBot(
    isAvailable ? "Botas disponibles" : "Botas no disponibles"
  );
});
