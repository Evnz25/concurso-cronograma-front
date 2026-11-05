import { getInitials } from "@/services/userService";

interface AvatarProps {
  name: string;
  size?: "small" | "large";
  onClick?: () => void;
  ariaLabel?: string;
}

export function Avatar({ name, size, onClick, ariaLabel }: AvatarProps) {
  const className = size ? `avatar ${size}` : "avatar";
  const initials = getInitials(name);
  if (onClick) {
    return (
      <button className={className} onClick={onClick} aria-label={ariaLabel}>
        {initials}
      </button>
    );
  }
  return <span className={className}>{initials}</span>;
}
