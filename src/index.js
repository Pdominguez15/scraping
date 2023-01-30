import { Router } from "itty-router";
import {
  connectionBD,
  disconnectBD,
  getDataFromBD,
  insertProduct,
} from "../bd/connection";
import {
  getData,
  isUrlValid,
  scraping,
  sendMessageToTelegramBot,
} from "../helpers";

const router = Router();

router.post("/getData", async (request) => {
  const params = await request.json();

  if (isUrlValid(params.url)) {
    const data = await getData(params.url);
    return new Response(JSON.stringify(data), { status: 200 });
  }

  return new Response("Error in data", { status: 400 });
});

router.post("/sendData", async (request) => {
  const product = await request.json();

  if (!product?.url || !product?.size || !product?.store || !product?.name) {
    return new Response("Error, missing data", { status: 400 });
  }

  const user = await connectionBD();
  await insertProduct(user, product);
  await disconnectBD(user);

  return new Response("Product saved", { status: 201 });
});

const getAllScraping = async (env) => {
  const user = await connectionBD();
  const data = await getDataFromBD(user);

  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    const isAvailable = await scraping(product);
    if (isAvailable) {
      await sendMessageToTelegramBot(
        env,
        `${product.name} talla ${product.size} está disponible`
      );
    }
  }

  await disconnectBD(user);
};

export default {
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(getAllScraping(env));
  },
  async fetch(request, env, context) {
    return await router.handle(request, env);
  },
};
