import * as Realm from "realm-web";

export const connectionBD = async () => {
  const app = new Realm.App("application-0-rymyb");

  const credentials = Realm.Credentials.apiKey(
    "ftWb1VBjm9XMluj3DrbdTU52NnuoVwFhaoQnrpHSpFoU3R8Kn3ilcUexoVTeR6l5"
  );

  const user = await app.logIn(credentials);

  return user;
};

export const getDataFromBD = async (user) => {
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  return bd.find({});
};

export const insertProduct = async (user, product) => {
  const client = user.mongoClient("mongodb-atlas");
  const bd = client.db("cloudflare").collection("todos");

  return bd.insertOne(product);
};

export const disconnectBD = async (user) => {
  await user.logOut();
};
