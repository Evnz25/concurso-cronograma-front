import { Avatar } from "../common/Avatar";
import { Icon } from "../common/Icon";

interface TopbarProps {
  title: string;
  userName: string;
  streakDays: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export function Topbar({
  title,
  userName,
  streakDays,
  onOpenNotifications,
  onOpenProfile,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span className="desktop-only">Meu espaço</span>
        <span className="desktop-only">/</span>
        <strong>{title}</strong>
        <span className="mobile-brand">
          AprovaTech<span>.</span>
        </span>
      </div>
      <div className="topbar-actions">
        <span className="streak">
          <Icon name="fire" size={17} />
          <strong>{streakDays}</strong>
          <span>dias de foco</span>
        </span>
        <span className="topbar-divider" />
        <button
          className="notification-button"
          aria-label="Notificações"
          onClick={onOpenNotifications}
        >
          <Icon name="bell" />
          <i />
        </button>
        <Avatar name={userName} size="small" onClick={onOpenProfile} ariaLabel="Meu perfil" />
      </div>
    </header>
  );
}
