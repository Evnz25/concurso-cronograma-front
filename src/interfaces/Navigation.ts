import type { IconName } from "./Icon";

export type PageId = "home" | "study" | "questions" | "stats" | "profile";

export interface NavigationItem {
  id: PageId;
  /** Rótulo exibido na sidebar (desktop). */
  name: string;
  /** Rótulo curto exibido na barra inferior (mobile). */
  mobile: string;
  icon: IconName;
}

export type ModalType = "notifications" | "reset" | "delete" | "help";
