import { Icon } from "../common/Icon";

interface HeroBannerProps {
  onContinue: () => void;
}

export function HeroBanner({ onContinue }: HeroBannerProps) {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-label">
          <span className="live-dot" />
          SEU FUTURO ESTÁ EM CONSTRUÇÃO
        </div>
        <h2>
          Mais perto da sua vaga.
          <br />
          Uma revisão de cada vez.
        </h2>
        <p>
          Seu cronograma se adapta a você.
          <br />
          Foque no que importa, a gente cuida do resto.
        </p>
        <button className="hero-button" onClick={onContinue}>
          Continuar meus estudos <Icon name="arrow" size={18} />
        </button>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-spark spark-one">+</div>
        <div className="art-spark spark-two">+</div>
        <div className="floating-code">
          <Icon name="code" size={23} />
        </div>
        <div className="art-stack back" />
        <div className="art-stack middle" />
        <div className="art-card">
          <div className="art-card-top">
            <span />
            <i />
            <i />
          </div>
          <div className="art-check">
            <Icon name="check" size={35} />
          </div>
          <div className="art-line" />
          <div className="art-line short" />
          <div className="art-progress">
            <span />
          </div>
          <div className="art-card-bottom">
            <span>PRÓXIMA CONQUISTA</span>
            <Icon name="spark" size={14} />
          </div>
        </div>
        <div className="floating-success">
          <span>
            <Icon name="trend" size={17} />
          </span>
          <div>
            <small>Um passo à frente</small>
            <strong>Todos os dias.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
