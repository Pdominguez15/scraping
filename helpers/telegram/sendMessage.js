const URL = "https://api.telegram.org/bot";

export const sendMessageToTelegramBot = async (env, message) => {
  const url = URL + env.TOKEN_TELEGRAM + "/sendMessage?";
  await fetch(
    url +
      new URLSearchParams({
        chat_id: env.CHAT_ID,
        text: message,
      })
  );
};
