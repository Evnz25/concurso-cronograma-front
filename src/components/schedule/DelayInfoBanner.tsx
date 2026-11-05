import { Icon } from "../common/Icon";

/** Aviso RF13: blocos não concluídos atrasam o ciclo. */
export function DelayInfoBanner() {
  return (
    <div className="info-banner">
      <Icon name="clock" size={21} />
      <div>
        <strong>Seu plano se adapta à vida real.</strong>
        <p>
          Blocos não concluídos hoje serão redistribuídos para os próximos dias. Isso pode adiar a
          previsão de conclusão da trilha.
        </p>
      </div>
    </div>
  );
}
