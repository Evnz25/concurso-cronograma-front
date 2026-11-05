import { useEffect, useRef, useState, type CSSProperties } from "react";

type IconName =
  | "home"
  | "calendar"
  | "book"
  | "chart"
  | "user"
  | "arrow"
  | "chevron"
  | "bell"
  | "clock"
  | "target"
  | "check"
  | "fire"
  | "spark"
  | "code"
  | "server"
  | "database"
  | "shield"
  | "briefcase"
  | "pin"
  | "close"
  | "help"
  | "settings"
  | "logout"
  | "coffee"
  | "trend"
  | "mail";
function Icon({
  name,
  size = 20,
  ...props
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4m10-4v4M3 11h18m-14 4h2m3 0h2m3 0h1m-11 3h2m3 0h2" />
      </>
    ),
    book: (
      <>
        <path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15" />
      </>
    ),
    chart: (
      <>
        <path d="M4 3v18h18M9 16v-5m5 5V7m5 9V3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    bell: (
      <>
        <path d="M5 9a7 7 0 0 1 14 0c0 7 3 7 3 9H2c0-2 3-2 3-9m4 12h6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    fire: (
      <path d="M12 2c1 6-5 7-5 11 0 2 1 3 2 3-1-5 4-5 4-9 2 3 6 6 6 10a7 7 0 0 1-14 0c0-5 3-6 7-15Z" />
    ),
    spark: (
      <>
        <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4ZM20 2v4m-2-2h4" />
      </>
    ),
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />
      </>
    ),
    server: (
      <>
        <rect x="3" y="3" width="18" height="7" rx="2" />
        <rect x="3" y="14" width="18" height="7" rx="2" />
        <path d="M7 6.5h.01M7 17.5h.01M16 7h2m-2 10h2" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V3h8v4M3 12c5 4 13 4 18 0m-11 2h4" />
      </>
    ),
    pin: (
      <>
        <path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="9" r="2" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 8a3 3 0 0 1 6 1c0 2-3 2-3 5m0 3h.01" />
      </>
    ),
    settings: (
      <>
        <path d="m9 3-1 3-3 1-2 4 2 2v3l3 2 1 3h6l1-3 3-2v-3l2-2-2-4-3-1-1-3Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    logout: (
      <>
        <path d="M9 3H4v18h5m5-15 6 6-6 6m-5-6h11" />
      </>
    ),
    coffee: (
      <>
        <path d="M3 8h14v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Zm14 1h2a3 3 0 0 1 0 6h-2M7 2v3m5-3v3" />
      </>
    ),
    trend: <path d="m3 17 6-6 4 4 8-10m-6 0h6v6" />,
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 6 10 7L22 6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

const tracks: { name: string; icon: IconName; detail: string }[] = [
  {
    name: "Desenvolvimento e Engenharia de Software",
    icon: "code",
    detail: "Algoritmos, arquitetura e boas práticas",
  },
  {
    name: "Infraestrutura e Redes",
    icon: "server",
    detail: "Sistemas, redes e computação em nuvem",
  },
  {
    name: "Banco de Dados e Ciência de Dados",
    icon: "database",
    detail: "SQL, modelagem e análise de dados",
  },
  {
    name: "Segurança da Informação",
    icon: "shield",
    detail: "Proteção, riscos e segurança digital",
  },
  {
    name: "Governança e Gestão de TI",
    icon: "briefcase",
    detail: "ITIL, COBIT e gestão de projetos",
  },
];
const navigation: { id: string; name: string; icon: IconName; mobile: string }[] = [
  { id: "home", name: "Visão geral", icon: "home", mobile: "Início" },
  { id: "study", name: "Meu cronograma", icon: "calendar", mobile: "Cronograma" },
  { id: "questions", name: "Banco de questões", icon: "book", mobile: "Questões" },
  { id: "stats", name: "Meu desempenho", icon: "chart", mobile: "Desempenho" },
  { id: "profile", name: "Meu perfil", icon: "user", mobile: "Perfil" },
];
const blocks: {
  title: string;
  topic: string;
  time: string;
  duration: string;
  icon: IconName;
  color: string;
  tag: string;
}[] = [
  {
    title: "Engenharia de Software",
    topic: "Requisitos e metodologias ágeis",
    time: "09:00",
    duration: "1h 30min",
    icon: "code",
    color: "purple",
    tag: "Revisão SRS",
  },
  {
    title: "Banco de Dados",
    topic: "SQL e normalização de dados",
    time: "10:45",
    duration: "1h",
    icon: "database",
    color: "blue",
    tag: "Prioridade alta",
  },
  {
    title: "Segurança da Informação",
    topic: "Criptografia e protocolos",
    time: "14:00",
    duration: "1h 30min",
    icon: "shield",
    color: "orange",
    tag: "Novo conteúdo",
  },
];
const exams = [
  {
    org: "BB",
    name: "Banco do Brasil",
    job: "Analista de Tecnologia",
    place: "Brasília, DF",
    salary: "R$ 8.500,00",
    date: "28 jun, 2025",
    track: 0,
    color: "yellow",
    vacancies: "40 vagas",
    description: "Conhecimentos de desenvolvimento, engenharia de software e sistemas bancários.",
  },
  {
    org: "SR",
    name: "Serpro",
    job: "Analista de Tecnologia da Informação",
    place: "Nacional",
    salary: "R$ 9.025,73",
    date: "05 jul, 2025",
    track: 0,
    color: "blue",
    vacancies: "100 vagas",
    description: "Atuação em soluções digitais e serviços de tecnologia para o setor público.",
  },
  {
    org: "TC",
    name: "Tribunal de Contas da União",
    job: "Auditor Federal de Controle Externo — TI",
    place: "Brasília, DF",
    salary: "R$ 26.159,01",
    date: "12 jul, 2025",
    track: 4,
    color: "green",
    vacancies: "20 vagas",
    description: "Auditoria de sistemas, governança de TI e fiscalização de recursos públicos.",
  },
];
const questions = [
  {
    theme: "Banco de Dados",
    topic: "Normalização de dados",
    source: "CEBRASPE · Serpro · 2024",
    text: "No contexto de bancos de dados relacionais, uma relação está na Terceira Forma Normal (3FN) quando:",
    options: [
      "Todos os atributos contêm apenas valores atômicos, independentemente de suas dependências.",
      "Está na Segunda Forma Normal e nenhum atributo não chave depende transitivamente da chave primária.",
      "Todos os atributos não chave dependem de apenas uma parte da chave primária composta.",
      "Não possui chaves estrangeiras nem relacionamentos com outras tabelas.",
    ],
    correct: 1,
    explanation:
      "A 3FN elimina dependências transitivas: os atributos não chave devem depender diretamente da chave primária, e não de outros atributos não chave.",
  },
  {
    theme: "Engenharia de Software",
    topic: "Metodologias ágeis",
    source: "FGV · Analista de TI · 2024",
    text: "No framework Scrum, qual evento tem como principal objetivo inspecionar a última Sprint e planejar melhorias na qualidade e na eficácia do trabalho?",
    options: [
      "Sprint Planning.",
      "Daily Scrum.",
      "Sprint Retrospective.",
      "Product Backlog Refinement.",
    ],
    correct: 2,
    explanation:
      "A Sprint Retrospective é o momento em que o time inspeciona pessoas, interações, processos e ferramentas para planejar melhorias para a próxima Sprint.",
  },
  {
    theme: "Segurança da Informação",
    topic: "Criptografia",
    source: "CEBRASPE · TCU · 2024",
    text: "Qual mecanismo utiliza um par de chaves, uma pública e outra privada, para proteger a troca de informações?",
    options: [
      "Criptografia simétrica.",
      "Função de hash.",
      "Codificação Base64.",
      "Criptografia assimétrica.",
    ],
    correct: 3,
    explanation:
      "A criptografia assimétrica utiliza duas chaves matematicamente relacionadas: uma chave pública, que pode ser compartilhada, e uma chave privada, que deve ser mantida em segredo.",
  },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [completed, setCompleted] = useState<number[]>([0]);
  const [track, setTrack] = useState(0);
  const [name, setName] = useState("Lucas Oliveira");
  const [email, setEmail] = useState("lucas.oliveira@email.com");
  const [password, setPassword] = useState("");
  const [savedName, setSavedName] = useState("Lucas Oliveira");
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<"notifications" | "reset" | "delete" | "help" | null>(null);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [examFilter, setExamFilter] = useState("all");
  const [selectedDay, setSelectedDay] = useState(18);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ correct: boolean; theme: string }[]>([]);
  const [period, setPeriod] = useState("week");
  const dialogRef = useRef<HTMLElement>(null);
  const dialogOpen = modal !== null || selectedExam !== null;

  useEffect(() => {
    if (!dialogOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
        setSelectedExam(null);
      }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled), a[href], input, select",
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [dialogOpen]);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 4500);
  };
  const go = (id: string) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const question = questions[questionIndex];
  const totalMinutes = completed.reduce((sum, i) => sum + (i === 1 ? 60 : 90), 0);
  const toggleBlock = (i: number) =>
    setCompleted((prev) => (prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]));

  function StudyBlocks({ compact = false }: { compact?: boolean }) {
    return (
      <div className={`study-blocks ${compact ? "compact" : ""}`}>
        {blocks.map((block, i) => (
          <div key={block.title}>
            {!compact && i === 1 && (
              <div className="break-line">
                <Icon name="coffee" size={16} />
                <span>10:30 – 10:45</span> Pausa para recarregar{" "}
                <span className="break-duration">15 min</span>
              </div>
            )}
            <div className={`study-block ${completed.includes(i) ? "is-done" : ""}`}>
              <button
                className={`check-control ${completed.includes(i) ? "checked" : ""}`}
                role="checkbox"
                aria-checked={completed.includes(i)}
                aria-label={`Concluir ${block.title}`}
                onClick={() => toggleBlock(i)}
              >
                {completed.includes(i) && <Icon name="check" size={15} />}
              </button>
              <span className={`subject-icon ${block.color}`}>
                <Icon name={block.icon} size={21} />
              </span>
              <div className="block-copy">
                <h3>{block.title}</h3>
                <p>
                  {compact ? (
                    <>
                      <Icon name="clock" size={12} /> {block.time} <span>·</span> {block.duration}
                    </>
                  ) : (
                    block.topic
                  )}
                </p>
              </div>
              {compact ? (
                <span
                  className={`badge ${completed.includes(i) ? "green" : i === 1 ? "purple" : "neutral"}`}
                >
                  {completed.includes(i) ? "Concluído" : i === 1 ? "Revisão SRS" : "A fazer"}
                </span>
              ) : (
                <div className="block-meta">
                  <span className={`badge ${block.color}`}>
                    {completed.includes(i) ? "Concluído" : block.tag}
                  </span>
                  <span>
                    {block.time} · {block.duration}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("home");
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
          {navigation.map((item) => (
            <button
              className={page === item.id ? "nav-item active" : "nav-item"}
              onClick={() => go(item.id)}
              key={item.id}
            >
              <Icon name={item.icon} />
              <span>{item.name}</span>
              {item.id === "questions" && <span className="nav-count">12</span>}
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
          <button className="nav-item support" onClick={() => setModal("help")}>
            <Icon name="help" />
            <span>Central de ajuda</span>
            <Icon name="arrow" size={16} />
          </button>
          <button className="sidebar-profile" onClick={() => go("profile")}>
            <span className="avatar">
              {" "}
              {savedName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("") || "AT"}{" "}
            </span>
            <span>
              <strong>{savedName || "Estudante"}</strong>
              <small>Futuro aprovado</small>
            </span>
            <Icon name="chevron" size={16} />
          </button>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <span className="desktop-only">Meu espaço</span>
            <span className="desktop-only">/</span>
            <strong>{navigation.find((n) => n.id === page)?.name}</strong>
            <span className="mobile-brand">
              AprovaTech<span>.</span>
            </span>
          </div>
          <div className="topbar-actions">
            <span className="streak">
              <Icon name="fire" size={17} />
              <strong>7</strong>
              <span>dias de foco</span>
            </span>
            <span className="topbar-divider" />
            <button
              className="notification-button"
              aria-label="Notificações"
              onClick={() => setModal("notifications")}
            >
              <Icon name="bell" />
              <i />
            </button>
            <button className="avatar small" onClick={() => go("profile")} aria-label="Meu perfil">
              {savedName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("") || "AT"}
            </button>
          </div>
        </header>
        <main>
          {page === "home" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">QUARTA-FEIRA, 18 DE JUNHO DE 2025</div>
                  <h1>
                    Seu próximo passo é a aprovação<span className="purple-text">.</span>
                  </h1>
                  <p>
                    Bom dia, {savedName.split(" ")[0] || "estudante"}! Vamos transformar dedicação
                    em resultado?
                  </p>
                </div>
                <span className="date-pill">
                  <Icon name="calendar" size={16} />
                  18 de junho
                </span>
              </div>
              <div className="home-grid">
                <div className="main-column">
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
                      <button className="hero-button" onClick={() => go("study")}>
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
                  <div className="metrics-row">
                    <div className="metric-card">
                      <div className="metric-top">
                        <span className="metric-label">Tempo de estudo</span>
                        <span className="metric-icon purple">
                          <Icon name="clock" size={18} />
                        </span>
                      </div>
                      <div className="metric-value">
                        {(12 + totalMinutes / 60).toLocaleString("pt-BR")}
                        <span>h</span>
                        <small className="positive">
                          <Icon name="trend" size={12} /> 18%
                        </small>
                      </div>
                      <p>nesta semana</p>
                      <div className="metric-sparkline purple-bars">
                        {[20, 35, 26, 45, 38, 54, 62, 48, 70, 61, 82, 98].map((h, i) => (
                          <i key={i} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-top">
                        <span className="metric-label">Questões resolvidas</span>
                        <span className="metric-icon blue">
                          <Icon name="book" size={18} />
                        </span>
                      </div>
                      <div className="metric-value">
                        {148 + answers.length}
                        <small className="positive">
                          <Icon name="trend" size={12} /> 24%
                        </small>
                      </div>
                      <p>continue nesse ritmo</p>
                      <div className="tiny-chart">
                        <svg viewBox="0 0 150 38" preserveAspectRatio="none">
                          <path
                            d="M0 34 15 30 28 33 43 22 57 24 71 15 85 18 101 10 116 13 130 4 150 1"
                            fill="none"
                            stroke="#6c98dd"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-top">
                        <span className="metric-label">Taxa de acertos</span>
                        <span className="metric-icon green">
                          <Icon name="target" size={18} />
                        </span>
                      </div>
                      <div className="metric-value">
                        {Math.round(
                          ((121 + answers.filter((a) => a.correct).length) /
                            (148 + answers.length)) *
                            100,
                        )}
                        <span>%</span>
                        <small className="positive">+5%</small>
                      </div>
                      <p>acima da semana passada</p>
                      <div className="metric-progress">
                        <span />
                      </div>
                    </div>
                  </div>
                  <section className="panel schedule-panel">
                    <div className="section-heading">
                      <div>
                        <h2>
                          Seu plano de hoje <span className="count-badge">3 blocos</span>
                        </h2>
                        <p>Pequenos passos, grandes conquistas.</p>
                      </div>
                      <button className="text-button" onClick={() => go("study")}>
                        Ver cronograma <Icon name="arrow" size={15} />
                      </button>
                    </div>
                    <StudyBlocks compact />
                    <div className="schedule-footer">
                      <Icon name="spark" size={15} />
                      <span>Organizado para você pela repetição espaçada.</span>
                      <span className="srs-label">SRS inteligente</span>
                    </div>
                  </section>
                  <section className="opportunities-section">
                    <div className="section-heading">
                      <div>
                        <h2>
                          Oportunidades para o seu futuro <span className="little-dot" />
                        </h2>
                        <p>Concursos abertos que combinam com você.</p>
                      </div>
                      <select
                        aria-label="Filtrar concursos"
                        value={examFilter}
                        onChange={(e) => setExamFilter(e.target.value)}
                      >
                        <option value="all">Todos os editais</option>
                        <option value="mine">Minha trilha</option>
                        <option value="salary">Maior salário</option>
                      </select>
                    </div>
                    <div className="exam-list">
                      {exams
                        .map((exam, index) => ({ ...exam, index }))
                        .filter((exam) => examFilter !== "mine" || exam.track === track)
                        .sort((a, b) =>
                          examFilter === "salary" ? b.index - a.index : a.index - b.index,
                        )
                        .map((exam) => (
                          <button
                            className="exam-card"
                            key={exam.name}
                            onClick={() => setSelectedExam(exam.index)}
                          >
                            <span className={`org-logo ${exam.color}`}>
                              {exam.org === "BB" ? <span className="bb-symbol">≋</span> : exam.org}
                            </span>
                            <span className="exam-info">
                              <span className="exam-title">
                                {exam.name}
                                <span className="badge green">Inscrições abertas</span>
                              </span>
                              <span className="exam-job">{exam.job}</span>
                              <span className="exam-details">
                                <span>
                                  <Icon name="pin" size={13} />
                                  {exam.place}
                                </span>
                                <span>
                                  <Icon name={tracks[exam.track].icon} size={13} />
                                  {exam.track === 0 ? "Desenvolvimento" : "Governança de TI"}
                                </span>
                              </span>
                            </span>
                            <span className="exam-right">
                              <strong>{exam.salary}</strong>
                              <small>até {exam.date}</small>
                            </span>
                            <Icon name="chevron" size={17} />
                          </button>
                        ))}
                      {examFilter === "mine" && !exams.some((e) => e.track === track) && (
                        <div className="empty-state">
                          <Icon name="briefcase" size={28} />
                          <h3>Novas oportunidades em breve</h3>
                          <p>Nenhum edital desta trilha na nossa seleção demonstrativa.</p>
                          <button className="text-button" onClick={() => setExamFilter("all")}>
                            Ver todos os editais <Icon name="arrow" size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="demo-note">
                      Seleção ilustrativa de editais para explorar o app.
                    </span>
                  </section>
                </div>
                <aside className="right-column">
                  <section className="pending-card">
                    <div className="pending-top">
                      <span className="pending-icon">
                        <Icon name="bell" size={20} />
                      </span>
                      <span className="badge orange">PARA HOJE</span>
                    </div>
                    <h3>
                      Sua memória precisa
                      <br />
                      de um reforço.
                    </h3>
                    <p>
                      Você tem <strong>{Math.max(0, 12 - answers.length)} questões</strong> para
                      revisar.
                      <br />
                      Não deixe o conhecimento escapar!
                    </p>
                    <button onClick={() => go("questions")}>
                      Revisar agora <Icon name="arrow" size={17} />
                    </button>
                  </section>
                  <section className="panel daily-goal">
                    <div className="section-heading">
                      <h2>Meta diária</h2>
                      <Icon name="target" size={19} />
                    </div>
                    <div
                      className="goal-ring"
                      style={
                        {
                          "--progress": `${Math.min(100, (totalMinutes / 240) * 100)}%`,
                        } as CSSProperties
                      }
                    >
                      <div>
                        <strong>
                          {Math.floor(totalMinutes / 60)}
                          <span>h</span>
                          {totalMinutes % 60 ? ` ${totalMinutes % 60}` : ""}
                          <span>{totalMinutes % 60 ? "min" : ""}</span>
                        </strong>
                        <p>de 4h planejadas</p>
                      </div>
                    </div>
                    <div className="goal-caption">
                      <span className="little-dot" />
                      {completed.length === 3
                        ? "Meta alcançada. Excelente trabalho!"
                        : "Cada minuto conta. Continue!"}
                    </div>
                    <div className="goal-stats">
                      <span>
                        <strong>
                          {completed.length}
                          <small>/ 3</small>
                        </strong>
                        <small>blocos concluídos</small>
                      </span>
                      <span>
                        <strong>
                          {Math.round((totalMinutes / 240) * 100)}
                          <small>%</small>
                        </strong>
                        <small>da meta de hoje</small>
                      </span>
                    </div>
                  </section>
                  <section className="panel focus-card">
                    <div className="section-heading">
                      <h2>Sua trilha</h2>
                      <button aria-label="Editar trilha" onClick={() => go("profile")}>
                        <Icon name="settings" size={17} />
                      </button>
                    </div>
                    <span className="focus-icon">
                      <Icon name={tracks[track].icon} size={24} />
                    </span>
                    <h3>{tracks[track].name}</h3>
                    <div className="track-progress">
                      <span />
                    </div>
                    <div className="track-caption">
                      <span>Seu progresso na trilha</span>
                      <strong>32%</strong>
                    </div>
                    <button className="text-button" onClick={() => go("stats")}>
                      Explorar meu desempenho <Icon name="arrow" size={15} />
                    </button>
                  </section>
                  <div className="quote-card">
                    <span>“</span>
                    <p>
                      O segredo do sucesso é a<br />
                      constância no propósito.
                    </p>
                    <small>UM LEMBRETE PARA A SUA JORNADA</small>
                  </div>
                </aside>
              </div>
            </>
          )}

          {page === "study" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">SEU PLANO, NO SEU RITMO</div>
                  <h1>
                    Consistência que vira conquista<span className="purple-text">.</span>
                  </h1>
                  <p>Um cronograma inteligente que evolui com o seu aprendizado.</p>
                </div>
                <span className="smart-pill">
                  <Icon name="spark" size={15} /> SRS ativo
                </span>
              </div>
              <div className="study-layout">
                <div>
                  <section className="panel calendar-panel">
                    <div className="section-heading">
                      <h2>Junho de 2025</h2>
                      <span className="muted">Semana 25</span>
                    </div>
                    <div className="week-days">
                      {["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"].map((day, i) => (
                        <button
                          className={`${selectedDay === i + 16 ? "selected" : ""} ${i < 2 ? "past" : ""}`}
                          onClick={() => setSelectedDay(i + 16)}
                          key={day}
                        >
                          <span>{day}</span>
                          <strong>{i + 16}</strong>
                          <i className={i < 5 ? "has-study" : ""} />
                        </button>
                      ))}
                    </div>
                  </section>
                  <div className="section-heading day-heading">
                    <div>
                      <h2>
                        {selectedDay === 18
                          ? "Seu plano de hoje"
                          : `Plano de ${selectedDay} de junho`}
                      </h2>
                      <p>
                        {selectedDay === 18
                          ? "4 horas de foco · 3 blocos de estudo"
                          : selectedDay > 20
                            ? "Um respiro também faz parte da jornada."
                            : "Seu próximo ciclo de revisão."}
                      </p>
                    </div>
                    <span className="badge purple">
                      {selectedDay === 18
                        ? `${completed.length} de 3 concluídos`
                        : selectedDay > 20
                          ? "Descanso"
                          : "Planejado"}
                    </span>
                  </div>
                  {selectedDay === 18 ? (
                    <section className="panel full-schedule">
                      <StudyBlocks />
                      <div className="schedule-footer">
                        <Icon name="check" size={16} /> Marque cada bloco ao terminar seus estudos.
                      </div>
                    </section>
                  ) : (
                    <section className="panel future-day">
                      <Icon name={selectedDay > 20 ? "coffee" : "calendar"} size={40} />
                      <h3>
                        {selectedDay > 20
                          ? "Tempo para recarregar"
                          : selectedDay < 18
                            ? "Seu histórico de estudos"
                            : "Preparando o próximo passo"}
                      </h3>
                      <p>
                        {selectedDay > 20
                          ? "Aproveite sua pausa programada. Seu próximo ciclo começa na segunda-feira."
                          : selectedDay < 18
                            ? "Os blocos desta data já foram finalizados. Continue a jornada no plano de hoje."
                            : "Revisão de Banco de Dados · 1h"}
                      </p>
                      {selectedDay > 18 && selectedDay < 21 && (
                        <p>Engenharia de Software · 1h 30min · Pausa de 15 min entre blocos</p>
                      )}
                      <button className="text-button" onClick={() => setSelectedDay(18)}>
                        Voltar para hoje <Icon name="arrow" size={16} />
                      </button>
                    </section>
                  )}
                  <div className="info-banner">
                    <Icon name="clock" size={21} />
                    <div>
                      <strong>Seu plano se adapta à vida real.</strong>
                      <p>
                        Blocos não concluídos hoje serão redistribuídos para os próximos dias. Isso
                        pode adiar a previsão de conclusão da trilha.
                      </p>
                    </div>
                  </div>
                </div>
                <aside>
                  <section className="panel cycle-summary">
                    <span className="subject-icon purple">
                      <Icon name="spark" size={24} />
                    </span>
                    <h2>Inteligência a seu favor</h2>
                    <p>
                      Estude menos no automático.
                      <br />
                      Aprenda mais de verdade.
                    </p>
                    <div className="summary-row">
                      <span>Tempo máximo por matéria</span>
                      <strong>2 horas</strong>
                    </div>
                    <div className="summary-row">
                      <span>Pausa entre sessões</span>
                      <strong>15 min</strong>
                    </div>
                    <div className="summary-row">
                      <span>Próxima revisão SRS</span>
                      <strong>
                        {rating === "Difícil"
                          ? "Amanhã"
                          : rating === "Fácil"
                            ? "Em 7 dias"
                            : "Em 3 dias"}
                      </strong>
                    </div>
                    <div className="purple-info">
                      <Icon name="target" size={18} /> Priorizamos os temas que você precisa
                      reforçar, sem deixar os outros para trás.
                    </div>
                  </section>
                </aside>
              </div>
            </>
          )}

          {page === "questions" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">PRÁTICA QUE FIXA</div>
                  <h1>
                    Uma questão. Mais conhecimento<span className="purple-text">.</span>
                  </h1>
                  <p>Pratique, entenda seus erros e fortaleça sua memória.</p>
                </div>
                <span className="smart-pill">
                  <Icon name="spark" size={15} /> Revisão espaçada
                </span>
              </div>
              <div className="question-layout">
                <section className="panel question-panel">
                  <div className="question-top">
                    <span className="badge purple">{question.theme}</span>
                    <span className="muted">
                      Questão {questionIndex + 1} de {questions.length}
                    </span>
                  </div>
                  <div className="question-progress">
                    <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
                  </div>
                  <div className="question-source">
                    <Icon name="book" size={16} />
                    {question.source}
                    <span>·</span>
                    {question.topic}
                  </div>
                  <h2 className="question-text">{question.text}</h2>
                  <div className="answers">
                    {question.options.map((option, i) => (
                      <button
                        key={option}
                        disabled={revealed}
                        className={`answer ${answer === i ? "selected" : ""} ${revealed && i === question.correct ? "correct" : ""} ${revealed && answer === i && i !== question.correct ? "incorrect" : ""}`}
                        onClick={() => setAnswer(i)}
                      >
                        <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{option}</span>
                        {revealed && i === question.correct && <Icon name="check" size={20} />}
                      </button>
                    ))}
                  </div>
                  {!revealed ? (
                    <div className="question-bottom">
                      <span>
                        <Icon name="shield" size={15} />
                        Aqui, errar também é aprender.
                      </span>
                      <button
                        className="primary-button"
                        disabled={answer === null}
                        onClick={() => {
                          setRevealed(true);
                          setAnswers((prev) => [
                            ...prev,
                            { correct: answer === question.correct, theme: question.theme },
                          ]);
                        }}
                      >
                        Confirmar resposta <Icon name="arrow" size={17} />
                      </button>
                    </div>
                  ) : (
                    <div className="answer-feedback">
                      <div
                        className={`explanation ${answer === question.correct ? "success" : ""}`}
                      >
                        <strong>
                          <Icon name={answer === question.correct ? "check" : "book"} size={19} />
                          {answer === question.correct
                            ? "Muito bem! Você acertou."
                            : "Mais uma oportunidade de aprender."}
                        </strong>
                        <p>{question.explanation}</p>
                      </div>
                      <h3>Como foi resolver esta questão?</h3>
                      <p>Sua avaliação define quando vamos revisá-la novamente.</p>
                      <div className="difficulty-buttons">
                        {[
                          { label: "Difícil", time: "Revisar amanhã", icon: "target" },
                          { label: "Médio", time: "Revisar em 3 dias", icon: "clock" },
                          { label: "Fácil", time: "Revisar em 7 dias", icon: "check" },
                        ].map((item) => (
                          <button
                            className={rating === item.label ? "rated" : ""}
                            key={item.label}
                            onClick={() => {
                              setRating(item.label);
                              notify(`Revisão agendada: ${item.time.toLowerCase()}.`);
                            }}
                          >
                            <Icon name={item.icon as IconName} size={20} />
                            <strong>{item.label}</strong>
                            <small>{item.time}</small>
                          </button>
                        ))}
                      </div>
                      <button
                        className="primary-button next-question"
                        disabled={!rating}
                        onClick={() => {
                          if (questionIndex === questions.length - 1) {
                            go("stats");
                            notify("Sessão concluída! Confira o seu desempenho.");
                          } else {
                            setQuestionIndex(questionIndex + 1);
                            setAnswer(null);
                            setRevealed(false);
                            setRating(null);
                          }
                        }}
                      >
                        {questionIndex === questions.length - 1
                          ? "Concluir sessão"
                          : "Próxima questão"}
                        <Icon name="arrow" size={17} />
                      </button>
                    </div>
                  )}
                </section>
                <aside>
                  <section className="panel session-card">
                    <span className="subject-icon purple">
                      <Icon name="target" size={24} />
                    </span>
                    <h2>Sua sessão de revisão</h2>
                    <p>
                      Conhecimento que fica.
                      <br />
                      Confiança que cresce.
                    </p>
                    <div className="summary-row">
                      <span>Questões respondidas</span>
                      <strong>{answers.length}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Respostas corretas</span>
                      <strong>{answers.filter((a) => a.correct).length}</strong>
                    </div>
                    <div className="purple-info">
                      <Icon name="spark" size={20} /> Seu próximo ciclo se ajusta à dificuldade de
                      cada questão.
                    </div>
                  </section>
                </aside>
              </div>
            </>
          )}

          {page === "stats" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">CADA EVOLUÇÃO MERECE SER VISTA</div>
                  <h1>
                    Seu esforço tem resultado<span className="purple-text">.</span>
                  </h1>
                  <p>Veja o quanto você avançou e onde dar o próximo passo.</p>
                </div>
                <select
                  className="period-select"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  aria-label="Período das estatísticas"
                >
                  <option value="week">Esta semana</option>
                  <option value="month">Este mês</option>
                </select>
              </div>
              <div className="stats-top">
                <div className="panel stat-box">
                  <span className="metric-icon purple">
                    <Icon name="clock" />
                  </span>
                  <p>Horas de estudo</p>
                  <strong>
                    {period === "week"
                      ? (12 + totalMinutes / 60).toLocaleString("pt-BR")
                      : (48 + totalMinutes / 60).toLocaleString("pt-BR")}
                    <small>h</small>
                  </strong>
                  <span className="positive">18% a mais que no período anterior</span>
                </div>
                <div className="panel stat-box">
                  <span className="metric-icon blue">
                    <Icon name="book" />
                  </span>
                  <p>Questões resolvidas</p>
                  <strong>{(period === "week" ? 148 : 592) + answers.length}</strong>
                  <span className="positive">Cada questão é um passo à frente</span>
                </div>
                <div className="panel stat-box">
                  <span className="metric-icon green">
                    <Icon name="target" />
                  </span>
                  <p>Aproveitamento geral</p>
                  <strong>
                    {Math.round(
                      ((121 + answers.filter((a) => a.correct).length) / (148 + answers.length)) *
                        100,
                    )}
                    <small>%</small>
                  </strong>
                  <span className="positive">5 pontos acima da semana passada</span>
                </div>
              </div>
              <div className="charts-grid">
                <section className="panel chart-panel">
                  <div className="section-heading">
                    <div>
                      <h2>Seu tempo bem investido</h2>
                      <p>Horas de estudo por conteúdo</p>
                    </div>
                    <span className="badge neutral">
                      {period === "week" ? "Nesta semana" : "Neste mês"}
                    </span>
                  </div>
                  <div className="bar-chart">
                    <div className="chart-axis">
                      <span>{period === "week" ? "6h" : "24h"}</span>
                      <span>{period === "week" ? "4h" : "16h"}</span>
                      <span>{period === "week" ? "2h" : "8h"}</span>
                      <span>0h</span>
                    </div>
                    <div className="chart-columns">
                      {[
                        { title: "Eng. de Software", value: 5.5, color: "purple" },
                        { title: "Banco de Dados", value: 3, color: "blue" },
                        { title: "Segurança", value: 2.5, color: "mint" },
                        { title: "Redes", value: 1.5, color: "lavender" },
                        { title: "Governança", value: 1, color: "orange" },
                      ].map((item) => (
                        <div className="chart-column" key={item.title}>
                          <div className="bar-track">
                            <div
                              className={`chart-bar ${item.color}`}
                              style={{ height: `${(item.value / 6) * 100}%` }}
                            >
                              <span>{item.value * (period === "week" ? 1 : 4)}h</span>
                            </div>
                          </div>
                          <small>{item.title}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <section className="panel accuracy-panel">
                  <h2>Aprendizado em evolução</h2>
                  <p>Distribuição das respostas</p>
                  <div
                    className="accuracy-ring"
                    style={{
                      background: `conic-gradient(#b39ad5 0 ${((121 + answers.filter((a) => a.correct).length) / (148 + answers.length)) * 100}%, #f1e5df 0)`,
                    }}
                  >
                    <div>
                      <strong>
                        {Math.round(
                          ((121 + answers.filter((a) => a.correct).length) /
                            (148 + answers.length)) *
                            100,
                        )}
                        <span>%</span>
                      </strong>
                      <small>de acertos</small>
                    </div>
                  </div>
                  <div className="accuracy-legend">
                    <span>
                      <i />
                      Acertos <strong>{121 + answers.filter((a) => a.correct).length}</strong>
                    </span>
                    <span>
                      <i />
                      Erros <strong>{27 + answers.filter((a) => !a.correct).length}</strong>
                    </span>
                  </div>
                </section>
              </div>
              <section className="panel performance-panel">
                <div className="section-heading">
                  <div>
                    <h2>Um olhar para cada tema</h2>
                    <p>O SRS prioriza os conteúdos que precisam de mais atenção.</p>
                  </div>
                  <span className="smart-pill">
                    <Icon name="spark" size={14} /> Priorização inteligente
                  </span>
                </div>
                <div className="performance-table">
                  <div className="table-head">
                    <span>CONTEÚDO</span>
                    <span>ACERTOS / ERROS</span>
                    <span>APROVEITAMENTO</span>
                    <span>PRIORIDADE SRS</span>
                  </div>
                  {[
                    {
                      title: "Engenharia de Software",
                      icon: "code",
                      hits: 46,
                      errors: 6,
                      color: "purple",
                      priority: "Em dia",
                    },
                    {
                      title: "Banco de Dados",
                      icon: "database",
                      hits: 23,
                      errors: 13,
                      color: "blue",
                      priority: "Alta",
                    },
                    {
                      title: "Segurança da Informação",
                      icon: "shield",
                      hits: 24,
                      errors: 4,
                      color: "orange",
                      priority: "Média",
                    },
                    {
                      title: "Infraestrutura e Redes",
                      icon: "server",
                      hits: 16,
                      errors: 2,
                      color: "green",
                      priority: "Em dia",
                    },
                    {
                      title: "Governança e Gestão de TI",
                      icon: "briefcase",
                      hits: 12,
                      errors: 2,
                      color: "purple",
                      priority: "Em dia",
                    },
                  ].map((row) => {
                    const newAnswers = answers.filter((a) => a.theme === row.title);
                    const hits = row.hits + newAnswers.filter((a) => a.correct).length;
                    const errors = row.errors + newAnswers.filter((a) => !a.correct).length;
                    const pct = Math.round((hits / (hits + errors)) * 100);
                    return (
                      <div className="table-row" key={row.title}>
                        <span className="table-theme">
                          <span className={`subject-icon ${row.color}`}>
                            <Icon name={row.icon as IconName} size={18} />
                          </span>
                          <strong>{row.title}</strong>
                        </span>
                        <span className="hit-miss">
                          <b>{hits}</b>
                          <span>/</span>
                          {errors}
                        </span>
                        <span className="table-progress">
                          <span>
                            <i style={{ width: `${pct}%` }} />
                          </span>
                          <strong>{pct}%</strong>
                        </span>
                        <span>
                          <span
                            className={`badge ${row.priority === "Alta" ? "orange" : row.priority === "Média" ? "purple" : "green"}`}
                          >
                            {row.priority === "Alta" && <Icon name="spark" size={12} />}
                            {row.priority}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {page === "profile" && (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">UMA JORNADA QUE É SUA</div>
                  <h1>
                    Seu perfil. Seu próximo capítulo<span className="purple-text">.</span>
                  </h1>
                  <p>Conte um pouco sobre você e escolha o caminho da sua aprovação.</p>
                </div>
              </div>
              <div className="profile-layout">
                <div>
                  <form
                    className="panel profile-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSavedName(name);
                      setPassword("");
                      notify("Perfil e trilha atualizados nesta demonstração.");
                    }}
                  >
                    <div className="section-heading">
                      <div>
                        <h2>Vamos nos conhecer</h2>
                        <p>Seus dados, sempre do seu jeito.</p>
                      </div>
                      <span className="badge purple">Seu perfil</span>
                    </div>
                    <div className="profile-avatar-row">
                      <span className="avatar large">
                        {savedName
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("") || "AT"}
                      </span>
                      <div>
                        <strong>{savedName || "Boas-vindas ao AprovaTech"}</strong>
                        <span>Seu futuro começa aqui.</span>
                      </div>
                    </div>
                    <div className="form-grid">
                      <label>
                        Nome completo
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Como podemos chamar você?"
                          autoComplete="name"
                        />
                      </label>
                      <label>
                        E-mail
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="voce@email.com"
                          autoComplete="email"
                        />
                      </label>
                      <label className="full-width">
                        Senha
                        <input
                          type="password"
                          value={password}
                          minLength={8}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Digite uma nova senha"
                          autoComplete="new-password"
                        />
                        <small>
                          Use pelo menos 8 caracteres. Ambiente demonstrativo, sem autenticação
                          real.
                        </small>
                      </label>
                    </div>
                    <div className="track-selection">
                      <h2>Qual é o seu foco?</h2>
                      <p>Escolha a trilha que mais combina com seus objetivos.</p>
                      <div className="track-options">
                        {tracks.map((item, i) => (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={track === i}
                            className={`track-option ${track === i ? "selected" : ""}`}
                            onClick={() => setTrack(i)}
                            key={item.name}
                          >
                            <span className="subject-icon purple">
                              <Icon name={item.icon} size={22} />
                            </span>
                            <span>
                              <strong>{item.name}</strong>
                              <small>{item.detail}</small>
                            </span>
                            <span className="track-radio">{track === i && <span />}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-footer">
                      <span>
                        <Icon name="shield" size={15} /> Sua jornada, personalizada.
                      </span>
                      <button className="primary-button" type="submit">
                        {savedName ? "Salvar alterações" : "Criar perfil"}
                        <Icon name="check" size={17} />
                      </button>
                    </div>
                  </form>
                </div>
                <aside>
                  <section className="panel profile-tip">
                    <span className="subject-icon purple">
                      <Icon name="spark" size={24} />
                    </span>
                    <h2>
                      Um plano tão único
                      <br />
                      quanto você.
                    </h2>
                    <p>
                      Sua trilha orienta as questões, as revisões e as oportunidades que aparecem
                      por aqui.
                    </p>
                    <div className="purple-info">
                      <Icon name="code" size={20} />
                      Você pode mudar de trilha sempre que seus objetivos mudarem.
                    </div>
                  </section>
                  <section className="panel account-settings">
                    <h2>Configurações da conta</h2>
                    <button onClick={() => setModal("reset")}>
                      <Icon name="calendar" size={18} />
                      <span>Iniciar novo cronograma</span>
                      <Icon name="chevron" size={15} />
                    </button>
                    <p>Recomece seu ciclo de estudos e as revisões do algoritmo.</p>
                    <button className="danger-text" onClick={() => setModal("delete")}>
                      <Icon name="logout" size={18} />
                      <span>Excluir minha conta</span>
                      <Icon name="chevron" size={15} />
                    </button>
                    <small>Protótipo interativo. As alterações ficam apenas nesta sessão.</small>
                  </section>
                </aside>
              </div>
            </>
          )}
          <footer className="page-footer">
            <span>
              AprovaTech<span className="purple-text">.</span>{" "}
              <span>Feito para o seu próximo passo.</span>
            </span>
            <span>
              <span className="little-dot" />
              Consistência hoje. Aprovação amanhã.
            </span>
          </footer>
        </main>
      </div>
      <nav className="mobile-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <button
            key={item.id}
            className={page === item.id ? "active" : ""}
            onClick={() => go(item.id)}
          >
            <Icon name={item.icon} size={21} />
            <span>{item.mobile}</span>
          </button>
        ))}
      </nav>
      {toast && (
        <div className="toast" role="status">
          <span className="toast-icon">
            <Icon name="check" size={17} />
          </span>
          {toast}
          <button aria-label="Fechar mensagem" onClick={() => setToast("")}>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
      {(modal || selectedExam !== null) && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setModal(null);
            setSelectedExam(null);
          }}
        >
          <section
            className="modal panel"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Fechar"
              onClick={() => {
                setModal(null);
                setSelectedExam(null);
              }}
            >
              <Icon name="close" />
            </button>
            {selectedExam !== null ? (
              <>
                <span className={`org-logo ${exams[selectedExam].color}`}>
                  {exams[selectedExam].org}
                </span>
                <h2 id="modal-title">{exams[selectedExam].name}</h2>
                <p>{exams[selectedExam].job}</p>
                <div className="exam-modal-details">
                  <div>
                    <Icon name="pin" />
                    {exams[selectedExam].place}
                  </div>
                  <div>
                    <Icon name="briefcase" />
                    {exams[selectedExam].vacancies}
                  </div>
                  <div>
                    <Icon name="calendar" />
                    Inscrições até {exams[selectedExam].date}
                  </div>
                </div>
                <h3 className="exam-salary">
                  {exams[selectedExam].salary}
                  <small>remuneração inicial</small>
                </h3>
                <p>{exams[selectedExam].description}</p>
                <div className="purple-info">
                  Edital demonstrativo. Consulte os canais oficiais da instituição para confirmar
                  vagas e inscrições.
                </div>
                <button
                  className="primary-button"
                  onClick={() => {
                    setTrack(exams[selectedExam].track);
                    setSelectedExam(null);
                    go("study");
                    notify("Trilha ajustada para esta oportunidade.");
                  }}
                >
                  Preparar para este concurso <Icon name="arrow" size={17} />
                </button>
              </>
            ) : modal === "notifications" ? (
              <>
                <span className="subject-icon orange">
                  <Icon name="bell" size={23} />
                </span>
                <h2 id="modal-title">Um lembrete para evoluir</h2>
                <p>
                  Você tem {Math.max(0, 12 - answers.length)} questões aguardando revisão e{" "}
                  {3 - completed.length} blocos de estudo pendentes hoje.
                </p>
                <div className="purple-info">
                  <Icon name="spark" size={20} />
                  Revisar no momento certo ajuda a transformar conteúdo em memória de longo prazo.
                </div>
                <button
                  className="primary-button"
                  onClick={() => {
                    setModal(null);
                    go("questions");
                  }}
                >
                  Começar revisão <Icon name="arrow" size={17} />
                </button>
              </>
            ) : modal === "help" ? (
              <>
                <span className="subject-icon purple">
                  <Icon name="help" size={24} />
                </span>
                <h2 id="modal-title">Seu guia para a aprovação</h2>
                <div className="help-items">
                  <h3>1. Escolha sua trilha</h3>
                  <p>No perfil, selecione uma das cinco áreas de TI.</p>
                  <h3>2. Siga o seu ciclo</h3>
                  <p>Conclua os blocos diários e respeite as pausas.</p>
                  <h3>3. Responda e avalie</h3>
                  <p>
                    Na revisão, avalie cada questão como Fácil, Médio ou Difícil para definir o
                    próximo intervalo.
                  </p>
                </div>
                <button className="primary-button" onClick={() => setModal(null)}>
                  Entendi, vamos lá <Icon name="check" size={17} />
                </button>
              </>
            ) : (
              <>
                <span className={`subject-icon ${modal === "delete" ? "orange" : "purple"}`}>
                  <Icon name={modal === "delete" ? "user" : "calendar"} size={24} />
                </span>
                <h2 id="modal-title">
                  {modal === "delete" ? "Excluir seu perfil?" : "Um novo começo?"}
                </h2>
                <p>
                  {modal === "delete"
                    ? "Os dados do perfil e o progresso desta demonstração serão limpos. Esta ação não pode ser desfeita."
                    : "Seus blocos concluídos, respostas e intervalos de revisão serão reiniciados. Seu perfil e sua trilha serão mantidos."}
                </p>
                <div className="modal-actions">
                  <button className="secondary-button" onClick={() => setModal(null)}>
                    Cancelar
                  </button>
                  <button
                    className={`primary-button ${modal === "delete" ? "danger-button" : ""}`}
                    onClick={() => {
                      setCompleted([]);
                      setAnswers([]);
                      setQuestionIndex(0);
                      setAnswer(null);
                      setRevealed(false);
                      setRating(null);
                      setSelectedDay(18);
                      if (modal === "delete") {
                        setName("");
                        setSavedName("");
                        setEmail("");
                        setPassword("");
                        setTrack(0);
                        go("profile");
                        notify("Perfil demonstrativo excluído. Você pode começar de novo.");
                      } else {
                        go("study");
                        notify("Novo cronograma iniciado. Vamos recomeçar!");
                      }
                      setModal(null);
                    }}
                  >
                    {modal === "delete" ? "Sim, excluir perfil" : "Iniciar novo ciclo"}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
