"use server";
import { QueryClient } from "@tanstack/react-query";
import { env } from "~/env";
import type { SendMessageResponse } from "~/types/Telegram";

// Send the message via the Telegram Bot API
export async function sendTelegramMessage(message: string) {
  try {
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_IDS.split(",")[0];
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    });

    const data = await queryClient.fetchQuery({
      queryKey: ["telegram-message"],
      queryFn: async () => {
        const res = await fetch(telegramUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        });
        const data = (await res.json()) as SendMessageResponse;
        return data;
      },
    });

    if (!data.ok) {
      console.error("Something went wrong while sending the telegram message");
    }
  } catch (err) {
    console.error(
      "Something went wrong while sending the telegram message",
      err,
    );
  }
}
