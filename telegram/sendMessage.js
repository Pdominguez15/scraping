import fetch from "node-fetch";
import dotenv from "dotenv";

const URL = "https://api.telegram.org/bot";

export const sendMessageToTelegramBot = (message) => {
  const config = dotenv.config();
  const url = URL + config.parsed.TOKEN_TELEGRAM + "/sendMessage?";

  fetch(
    url +
      new URLSearchParams({
        chat_id: config.parsed.CHAT_ID,
        text: message,
      })
  );
};
