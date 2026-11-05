import { Icon } from "./Icon";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      <span className="toast-icon">
        <Icon name="check" size={17} />
      </span>
      {message}
      <button aria-label="Fechar mensagem" onClick={onClose}>
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}
