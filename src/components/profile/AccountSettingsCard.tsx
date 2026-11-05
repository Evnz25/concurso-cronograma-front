import { Icon } from "../common/Icon";

interface AccountSettingsCardProps {
  onResetSchedule: () => void;
  onDeleteAccount: () => void;
}

/** Ações de conta: novo ciclo (RF08) e exclusão de conta (RF04). */
export function AccountSettingsCard({
  onResetSchedule,
  onDeleteAccount,
}: AccountSettingsCardProps) {
  return (
    <section className="panel account-settings">
      <h2>Configurações da conta</h2>
      <button onClick={onResetSchedule}>
        <Icon name="calendar" size={18} />
        <span>Iniciar novo cronograma</span>
        <Icon name="chevron" size={15} />
      </button>
      <p>Recomece seu ciclo de estudos e as revisões do algoritmo.</p>
      <button className="danger-text" onClick={onDeleteAccount}>
        <Icon name="logout" size={18} />
        <span>Excluir minha conta</span>
        <Icon name="chevron" size={15} />
      </button>
      <small>Protótipo interativo. As alterações ficam apenas nesta sessão.</small>
    </section>
  );
}
