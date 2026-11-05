import { useRef, type ReactNode } from "react";
import { useDialogFocusTrap } from "@/hooks/useDialogFocusTrap";
import { Icon } from "./Icon";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

/** Estrutura base dos diálogos. O conteúdo deve conter um título com id="modal-title". */
export function Modal({ onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  useDialogFocusTrap(dialogRef, onClose);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal panel"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Fechar" onClick={onClose}>
          <Icon name="close" />
        </button>
        {children}
      </section>
    </div>
  );
}
