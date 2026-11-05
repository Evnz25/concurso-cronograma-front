import type {
  Exam,
  Question,
  StudyBlock,
  SubjectHours,
  ThemePerformance,
  Track,
} from "@/interfaces";

/**
 * Dados demonstrativos gerados no protótipo do Figma Make.
 * Serão substituídos pelo consumo da API REST do back-end.
 */

export const TRACKS: Track[] = [
  {
    id: "development",
    name: "Desenvolvimento e Engenharia de Software",
    shortName: "Desenvolvimento",
    icon: "code",
    detail: "Algoritmos, arquitetura e boas práticas",
  },
  {
    id: "infrastructure",
    name: "Infraestrutura e Redes",
    shortName: "Infraestrutura",
    icon: "server",
    detail: "Sistemas, redes e computação em nuvem",
  },
  {
    id: "data",
    name: "Banco de Dados e Ciência de Dados",
    shortName: "Dados",
    icon: "database",
    detail: "SQL, modelagem e análise de dados",
  },
  {
    id: "security",
    name: "Segurança da Informação",
    shortName: "Segurança",
    icon: "shield",
    detail: "Proteção, riscos e segurança digital",
  },
  {
    id: "governance",
    name: "Governança e Gestão de TI",
    shortName: "Governança de TI",
    icon: "briefcase",
    detail: "ITIL, COBIT e gestão de projetos",
  },
];

export const STUDY_BLOCKS: StudyBlock[] = [
  {
    id: "block-1",
    title: "Engenharia de Software",
    topic: "Requisitos e metodologias ágeis",
    startTime: "09:00",
    durationMinutes: 90,
    icon: "code",
    color: "purple",
    tag: "Revisão SRS",
    isSrsReview: true,
  },
  {
    id: "block-2",
    title: "Banco de Dados",
    topic: "SQL e normalização de dados",
    startTime: "10:45",
    durationMinutes: 60,
    icon: "database",
    color: "blue",
    tag: "Prioridade alta",
    isSrsReview: false,
  },
  {
    id: "block-3",
    title: "Segurança da Informação",
    topic: "Criptografia e protocolos",
    startTime: "14:00",
    durationMinutes: 90,
    icon: "shield",
    color: "orange",
    tag: "Novo conteúdo",
    isSrsReview: false,
  },
];

export const EXAMS: Exam[] = [
  {
    id: "bb-2025",
    org: "BB",
    name: "Banco do Brasil",
    job: "Analista de Tecnologia",
    place: "Brasília, DF",
    salary: 8500,
    registrationDeadline: "2025-06-28",
    trackId: "development",
    color: "yellow",
    vacancies: 40,
    description: "Conhecimentos de desenvolvimento, engenharia de software e sistemas bancários.",
  },
  {
    id: "serpro-2025",
    org: "SR",
    name: "Serpro",
    job: "Analista de Tecnologia da Informação",
    place: "Nacional",
    salary: 9025.73,
    registrationDeadline: "2025-07-05",
    trackId: "development",
    color: "blue",
    vacancies: 100,
    description: "Atuação em soluções digitais e serviços de tecnologia para o setor público.",
  },
  {
    id: "tcu-2025",
    org: "TC",
    name: "Tribunal de Contas da União",
    job: "Auditor Federal de Controle Externo — TI",
    place: "Brasília, DF",
    salary: 26159.01,
    registrationDeadline: "2025-07-12",
    trackId: "governance",
    color: "green",
    vacancies: 20,
    description: "Auditoria de sistemas, governança de TI e fiscalização de recursos públicos.",
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q-db-3fn",
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
    correctIndex: 1,
    explanation:
      "A 3FN elimina dependências transitivas: os atributos não chave devem depender diretamente da chave primária, e não de outros atributos não chave.",
  },
  {
    id: "q-es-scrum",
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
    correctIndex: 2,
    explanation:
      "A Sprint Retrospective é o momento em que o time inspeciona pessoas, interações, processos e ferramentas para planejar melhorias para a próxima Sprint.",
  },
  {
    id: "q-sec-crypto",
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
    correctIndex: 3,
    explanation:
      "A criptografia assimétrica utiliza duas chaves matematicamente relacionadas: uma chave pública, que pode ser compartilhada, e uma chave privada, que deve ser mantida em segredo.",
  },
];

/** Horas semanais estudadas por matéria. */
export const SUBJECT_HOURS: SubjectHours[] = [
  { title: "Eng. de Software", hours: 5.5, color: "purple" },
  { title: "Banco de Dados", hours: 3, color: "blue" },
  { title: "Segurança", hours: 2.5, color: "mint" },
  { title: "Redes", hours: 1.5, color: "lavender" },
  { title: "Governança", hours: 1, color: "orange" },
];

export const THEME_PERFORMANCE: ThemePerformance[] = [
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
];

/** Números históricos usados como base nas estatísticas demonstrativas. */
export const STATS_BASELINE = {
  weekHours: 12,
  monthHours: 48,
  weekQuestions: 148,
  monthQuestions: 592,
  hits: 121,
  errors: 27,
  pendingReviews: 12,
  focusStreakDays: 7,
  trackProgressPercent: 32,
};
