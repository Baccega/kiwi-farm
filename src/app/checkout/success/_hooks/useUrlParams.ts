import { useEffect, useState } from "react";

export function useUrlParams() {
  const [urlParams, setUrlParams] = useState<URLSearchParams | undefined>();
  useEffect(() => {
    if (!window) return;

    const queryString = window?.location?.search ?? "";
    setUrlParams(new URLSearchParams(queryString));
  }, []);

  return urlParams;
}
