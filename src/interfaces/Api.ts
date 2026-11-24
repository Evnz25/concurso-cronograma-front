/** Contratos das rotas de API-BddEstudos/api. Catálogo usa camelCase;
 * /sync devolve as linhas no formato snake_case do banco local. */
export interface ApiTrack {
  _id: string;
  nome: string;
  materias: { _id: string; nome: string; temas: { _id: string; nome: string }[] }[];
}
export interface ApiQuestion {
  _id: string;
  materiaId: string;
  temaId: string;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  banca: string;
  ano: number;
  fonteUrl?: string;
}
export interface ApiExam {
  _id: string;
  orgao: string;
  cargo: string;
  localizacao: string;
  salario?: number | null;
  fimEdital: string;
  editalUrl?: string;
  trilhaIds: string[];
}
export interface ApiUser {
  id: string;
  nome: string;
  email: string;
  provedorLogin?: string;
}
export interface AuthResponse {
  token: string;
  usuario: ApiUser;
}
export interface ApiStep {
  id: string;
  cronograma_id: string;
  materia_id: string;
  data: string;
  duracao_min: number;
  pausa_min: number;
  concluida: 0 | 1;
  concluida_em: string | null;
  atualizado_em: string;
}
export interface ApiSchedule {
  id: string;
  usuario_id: string;
  trilha_id: string;
  data_inicio: string;
  ativo: 0 | 1;
  atualizado_em: string;
  etapas: ApiStep[];
  pesos: { materia_id: string; peso: number }[];
}
export interface ApiAttempt {
  id: string;
  questao_id: string;
  acertou: 0 | 1;
  dificuldade_informada: number | null;
  respondida_em: string;
  repeticoes: number;
  intervalo_dias: number;
  fator_facilidade: number;
  proxima_revisao: string | null;
}
export interface ReviewEntry {
  questao_id: string;
  vencimento: string;
}
export interface AnswerInput {
  id: string;
  questao_id: string;
  alternativa: string;
  respondida_em: string;
  deslocamento_utc_min: number;
}
export interface SyncResponse {
  usuario: ApiUser;
  cronogramas: ApiSchedule[];
  tentativas: ApiAttempt[];
  agora: string;
  proximo_desde: string;
  tem_mais: boolean;
}
export interface SyncOperation {
  id: number;
  entidade: "cronograma" | "etapa_estudo" | "peso_materia" | "tentativa_exercicio";
  entidade_id: string;
  operacao: "insert" | "update";
  payload: Record<string, unknown>;
}
