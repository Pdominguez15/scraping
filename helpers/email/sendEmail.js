export const sendEmail = async (product) => {
  return await fetch("https://mailserver-rust.vercel.app/v1/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: product.notification,
      product: product.name + " talla " + product.size,
    }),
  });
};
