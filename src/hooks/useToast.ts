import { useCallback, useEffect, useRef, useState } from "react";

const TOAST_DURATION_MS = 4500;

/** Controla a mensagem de feedback temporária (toast). */
export function useToast() {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<number | undefined>(undefined);

  const dismiss = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    setMessage("");
  }, []);

  const notify = useCallback((text: string) => {
    window.clearTimeout(timeoutRef.current);
    setMessage(text);
    timeoutRef.current = window.setTimeout(() => setMessage(""), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return { message, notify, dismiss };
}
