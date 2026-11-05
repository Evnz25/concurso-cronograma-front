import type { NavigationItem, PageId } from "@/interfaces";
import { Avatar } from "../common/Avatar";
import { Icon } from "../common/Icon";

interface SidebarProps {
  items: NavigationItem[];
  page: PageId;
  userName: string;
  pendingReviews: number;
  onNavigate: (page: PageId) => void;
  onOpenHelp: () => void;
}

export function Sidebar({
  items,
  page,
  userName,
  pendingReviews,
  onNavigate,
  onOpenHelp,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <a
        className="brand"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("home");
        }}
        aria-label="AprovaTech, início"
      >
        <span className="brand-mark">
          <Icon name="code" size={23} />
        </span>
        <span>
          Aprova<span className="brand-accent">Tech</span>
          <span className="brand-dot">.</span>
        </span>
      </a>
      <div className="workspace-label">SEU ESPAÇO DE APROVAÇÃO</div>
      <nav className="main-nav">
        {items.map((item) => (
          <button
            className={page === item.id ? "nav-item active" : "nav-item"}
            onClick={() => onNavigate(item.id)}
            key={item.id}
          >
            <Icon name={item.icon} />
            <span>{item.name}</span>
            {item.id === "questions" && pendingReviews > 0 && (
              <span className="nav-count">{pendingReviews}</span>
            )}
            {page === item.id && <span className="active-dot" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="journey-card">
          <span className="journey-icon">
            <Icon name="spark" size={20} />
          </span>
          <h3>
            Sua aprovação começa
            <br />
            com constância.
          </h3>
          <p>
            Um pouco todos os dias.
            <br />
            Um grande futuro pela frente.
          </p>
          <div className="mini-progress">
            <span />
          </div>
          <small>Você está no caminho certo.</small>
        </div>
        <button className="nav-item support" onClick={onOpenHelp}>
          <Icon name="help" />
          <span>Central de ajuda</span>
          <Icon name="arrow" size={16} />
        </button>
        <button className="sidebar-profile" onClick={() => onNavigate("profile")}>
          <Avatar name={userName} />
          <span>
            <strong>{userName || "Estudante"}</strong>
            <small>Futuro aprovado</small>
          </span>
          <Icon name="chevron" size={16} />
        </button>
      </div>
    </aside>
  );
}
