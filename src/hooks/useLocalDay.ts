import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { localDate } from "@/services/formatService";

export function useLocalDay() {
  const [day, setDay] = useState(() => localDate());
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function update() {
      clearTimeout(timer);
      const now = new Date();
      setDay(localDate(now));
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      timer = setTimeout(update, midnight.getTime() - now.getTime());
    }
    update();
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") update();
    });
    return () => {
      clearTimeout(timer);
      subscription.remove();
    };
  }, []);
  return day;
}
