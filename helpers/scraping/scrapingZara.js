import { getProductName } from "../getProductName";
import { customFetch } from "./customFetch";

const getUrlApi = (url) => {
  const urlApi = `${url}&ajax=true`;
  return urlApi;
};

const mapperZara = (data, name) => {
  return data.map((product) => {
    return {
      color: product.name,
      id: product.productId.toString(),
      sizes: [...new Set(product.sizes.map((size) => size.name))],
      store: "zara",
      name: getProductName(name),
    };
  });
};

export const scrappingZara = async (url) => {
  const urlApi = getUrlApi(url);
  const json = await customFetch(urlApi);
  const name = json.product.name;
  const detail = json.product.detail.colors;

  return mapperZara(detail, name);
};

const isSizeAvailable = async (data, color, size) => {
  const product = data.filter(
    (product) => product.productId.toString() === color
  );
  const sizes = product[0].sizes.filter((sizeModel) => sizeModel.name === size);
  return sizes.some((size) => size.availability === "in_stock");
};

const getColor = (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const color = urlParams.get("v1");
  return color;
};

export const checkZara = async (product) => {
  const { url, size } = product;

  const urlApi = getUrlApi(url);
  const color = getColor(url);
  const json = await customFetch(urlApi);
  const detail = json.product.detail.colors;

  return isSizeAvailable(detail, color, size);
};
