import { useQuery } from "@tanstack/react-query";

export function useTelegramNotification(
  locale: string,
  sessionId: string | null,
) {
  const { refetch, isLoading } = useQuery({
    enabled: false,
    queryKey: ["sendTelegramMessage"],
    queryFn: () => {
      return fetch(`/${locale}/checkout/success/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
    },
  });

  return { sendTelegramNotification: refetch, isLoading };
}
