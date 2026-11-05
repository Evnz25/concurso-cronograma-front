import type { NavigationItem, PageId } from "@/interfaces";
import { Icon } from "../common/Icon";

interface MobileNavProps {
  items: NavigationItem[];
  page: PageId;
  onNavigate: (page: PageId) => void;
}

export function MobileNav({ items, page, onNavigate }: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Navegação principal">
      {items.map((item) => (
        <button
          key={item.id}
          className={page === item.id ? "active" : ""}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} size={21} />
          <span>{item.mobile}</span>
        </button>
      ))}
    </nav>
  );
}
