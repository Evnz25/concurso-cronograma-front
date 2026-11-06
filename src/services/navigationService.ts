import type { NavigationItem, PageId } from "@/interfaces";

export const NAVIGATION: NavigationItem[] = [
  { id: "home", name: "Visão geral", icon: "home", mobile: "Início" },
  {
    id: "study",
    name: "Meu cronograma",
    icon: "calendar",
    mobile: "Cronograma",
  },
  {
    id: "questions",
    name: "Banco de questões",
    icon: "book",
    mobile: "Questões",
  },
  /*{ id: "stats", name: "Meu desempenho", icon: "chart", mobile: "Desempenho" },*/
  { id: "profile", name: "Meu perfil", icon: "user", mobile: "Perfil" },
];

export function getNavigation(): NavigationItem[] {
  return NAVIGATION;
}

export function getPageTitle(page: PageId): string {
  if (page === "stats") return "Meu desempenho";
  return NAVIGATION.find((item) => item.id === page)?.name ?? "";
}

export function routeFor(page: PageId): string {
  switch (page) {
    case "home":
      return "/";
    case "study":
      return "/study";
    case "questions":
      return "/questions";
    case "stats":
      return "/stats";
    case "profile":
      return "/profile";
    default:
      return "/";
  }
}
