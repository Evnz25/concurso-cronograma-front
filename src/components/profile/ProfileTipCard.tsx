import { Icon } from "../common/Icon";

export function ProfileTipCard() {
  return (
    <section className="panel profile-tip">
      <span className="subject-icon purple">
        <Icon name="spark" size={24} />
      </span>
      <h2>
        Um plano tão único
        <br />
        quanto você.
      </h2>
      <p>Sua trilha orienta as questões, as revisões e as oportunidades que aparecem por aqui.</p>
      <div className="purple-info">
        <Icon name="code" size={20} />
        Você pode mudar de trilha sempre que seus objetivos mudarem.
      </div>
    </section>
  );
}
