import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Difficulty, Exam, ModalType, ProfileFormData, QuestionSession } from "@/interfaces";
import type { ApiTrack, ApiUser, SyncOperation, SyncResponse } from "@/interfaces/Api";
import { createApiClient, ApiError } from "@/services/apiService";
import { API_URL } from "@/services/apiConfig";
import {
  mapAttempt,
  mapBlocks,
  mapExam,
  mapQuestion,
  mapTrack,
  createScheduleOperations,
  newId,
} from "@/services/apiAdapters";
import { INITIAL_SESSION, getDifficultyOption } from "@/services/questionService";
import { getCompletedMinutes, getPlannedMinutes } from "@/services/scheduleService";
import { getPendingReviewCount } from "@/services/statsService";
import { localDate } from "@/services/formatService";
import { EMPTY_USER } from "@/services/userService";
import { DEFAULT_TRACK_ID } from "@/services/trackService";

const api = createApiClient(API_URL);
const STORAGE_KEY = "@aprovatech_session_v2";
interface Credentials {
  token: string;
  userId: string;
}
interface Data {
  tracks: ApiTrack[];
  questions: ReturnType<typeof mapQuestion>[];
  exams: Exam[];
  sync: SyncResponse | null;
}

const DEFAULT_RAW_TRACKS: ApiTrack[] = [
  {
    _id: "trilha-dev",
    nome: "Desenvolvimento",
    materias: [
      {
        _id: "mat-logica",
        nome: "Lógica de Programação",
        temas: [
          { _id: "tema-algoritmos", nome: "Algoritmos e Estruturas de Controle" },
          { _id: "tema-vetores", nome: "Vetores e Matrizes" },
        ],
      },
      {
        _id: "mat-eng-sw",
        nome: "Engenharia de Software",
        temas: [
          { _id: "tema-scrum", nome: "Metodologias Ágeis" },
          { _id: "tema-uml", nome: "UML" },
        ],
      },
      {
        _id: "mat-bd-dev",
        nome: "Banco de Dados",
        temas: [
          { _id: "tema-sql", nome: "SQL" },
          { _id: "tema-modelagem", nome: "Modelagem Entidade-Relacionamento" },
        ],
      },
    ],
  },
  {
    _id: "trilha-redes",
    nome: "Redes/Infraestrutura",
    materias: [
      {
        _id: "mat-redes",
        nome: "Redes de Computadores",
        temas: [{ _id: "tema-osi", nome: "Modelo OSI e TCP/IP" }],
      },
    ],
  },
  {
    _id: "trilha-dados",
    nome: "Dados",
    materias: [{ _id: "mat-bd-dados", nome: "Banco de Dados", temas: [] }],
  },
  { _id: "trilha-seg", nome: "Segurança", materias: [] },
  { _id: "trilha-gov", nome: "Governança", materias: [] },
];

const EMPTY_DATA: Data = { tracks: DEFAULT_RAW_TRACKS, questions: [], exams: [], sync: null };

function useAppState() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const credentialRef = useRef<Credentials | null>(null);
  const [data, setData] = useState<Data>(EMPTY_DATA);
  const [trackId, setTrackId] = useState("trilha-dev");
  const [isGuest, setIsGuest] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const initialized = useRef(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<QuestionSession>(INITIAL_SESSION);
  const attemptRef = useRef<{ id: string; answeredAt: string } | null>(null);
  const pendingCycle = useRef<{ trackId: string; operations: SyncOperation[] } | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const activeSchedule = data.sync?.cronogramas.find((schedule) => schedule.ativo === 1);
  const tracks = data.tracks.map(mapTrack);
  const allBlocks = mapBlocks(data.sync?.cronogramas || [], data.tracks);
  const scheduleBlocks = allBlocks.filter((block) => block.scheduleId === activeSchedule?.id);
  const blocks = scheduleBlocks.filter((block) => block.date === localDate());
  const completedIds = blocks.filter((block) => block.completed).map((block) => block.id);
  const questions = data.questions.filter((question) => question.trackId === trackId);
  const answers = (data.sync?.tentativas || []).map((attempt) =>
    mapAttempt(attempt, data.questions),
  );
  const user = data.sync
    ? {
        id: data.sync.usuario.id,
        name: data.sync.usuario.nome,
        email: data.sync.usuario.email,
        trackId:
          trackId ||
          data.sync.cronogramas.find((schedule) => schedule.ativo === 1)?.trilha_id ||
          "trilha-dev",
      }
    : {
        id: "guest",
        name: "Estudante",
        email: "estudante@aprovatech.com",
        trackId: trackId || "trilha-dev",
      };

  function clearSession() {
    credentialRef.current = null;
    setCredentials(null);
    setData((old) => ({ ...old, sync: null }));
    setIsGuest(false);
    setSession(INITIAL_SESSION);
    attemptRef.current = null;
    pendingCycle.current = null;
    setActiveModal(null);
    setSelectedExamId(null);
  }

  const enterAsGuest = () => {
    setIsGuest(true);
    setToastMessage("Modo visitante: explorando trilhas e cursos.");
  };

  async function run(action: () => Promise<void>, protectedAction = true): Promise<boolean> {
    if (locked.current) return false;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      await action();
      return true;
    } catch (err) {
      if (protectedAction && err instanceof ApiError && err.status === 401) {
        clearSession();
        await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
      }
      const message = err instanceof Error ? err.message : "Não foi possível concluir a operação.";
      setError(message);
      setToastMessage(message);
      return false;
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  async function loadCatalog() {
    try {
      const rawTracks = await api.tracks().catch(() => null);
      const rawExams = await api.exams().catch(() => null);
      if (rawTracks && rawTracks.length > 0) {
        setData((prev) => ({
          ...prev,
          tracks: rawTracks,
          exams: rawExams ? rawExams.map((exam) => mapExam(exam, rawTracks)) : prev.exams,
        }));
      }
    } catch {
      // Mantém as trilhas padrão se o catálogo remoto falhar
    }
  }

  async function load(current: Credentials) {
    const [rawTracks, rawExams, sync] = await Promise.all([
      api.tracks(),
      api.exams(),
      api.download(current.token),
    ]);
    if (sync.usuario.id !== current.userId)
      throw new ApiError("A sessão não corresponde ao usuário.", 401);
    const groups = await Promise.all(rawTracks.map((track) => api.questions(track._id)));
    const unique = new Map(groups.flat().map((question) => [question._id, question]));
    setData({
      tracks: rawTracks,
      exams: rawExams.map((exam) => mapExam(exam, rawTracks)),
      questions: [...unique.values()].map((question) => mapQuestion(question, rawTracks)),
      sync,
    });
    setTrackId(
      sync.cronogramas.find((schedule) => schedule.ativo === 1)?.trilha_id ||
        rawTracks[0]?._id ||
        "trilha-dev",
    );
    setSession(INITIAL_SESSION);
    attemptRef.current = null;
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void run(async () => {
      await loadCatalog();
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        let current: Credentials;
        try {
          current = JSON.parse(saved);
        } catch {
          await AsyncStorage.removeItem(STORAGE_KEY);
          return;
        }
        if (!current.token || !current.userId) {
          await AsyncStorage.removeItem(STORAGE_KEY);
          return;
        }
        credentialRef.current = current;
        setCredentials(current);
        await load(current);
      }
    }, false).finally(() => setReady(true));
  }, []);

  const authenticate = (
    mode: "login" | "cadastro",
    email: string,
    password: string,
    name?: string,
  ) =>
    run(async () => {
      const result = await api.authenticate(mode, email.trim(), password, name?.trim());
      const current = { token: result.token, userId: result.usuario.id };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      credentialRef.current = current;
      setCredentials(current);
      // A autenticação já foi concluída; erros posteriores aparecem com opção de atualizar.
      await load(current);
    }, false);

  const refresh = () =>
    run(async () => {
      if (credentialRef.current) await load(credentialRef.current);
    });
  const logout = () =>
    run(async () => {
      await AsyncStorage.removeItem(STORAGE_KEY);
      clearSession();
    });

  function requireCredentials(): Credentials {
    if (!credentialRef.current) throw new ApiError("Entre na sua conta para continuar.", 401);
    return credentialRef.current;
  }
  const toggleBlock = (blockId: string) =>
    run(async () => {
      const current = requireCredentials();
      const block = scheduleBlocks.find((item) => item.id === blockId);
      if (!block) return;
      const now = new Date().toISOString();
      const completed = !block.completed;
      await api.upload(current.token, [
        {
          id: 1,
          entidade: "etapa_estudo",
          entidade_id: blockId,
          operacao: "update",
          payload: {
            concluida: completed ? 1 : 0,
            concluida_em: completed ? now : null,
            atualizado_em: now,
          },
        },
      ]);
      setData((previous) => ({
        ...previous,
        sync: previous.sync && {
          ...previous.sync,
          cronogramas: previous.sync.cronogramas.map((schedule) => ({
            ...schedule,
            etapas: schedule.etapas.map((step) =>
              step.id === blockId
                ? {
                    ...step,
                    concluida: completed ? 1 : 0,
                    concluida_em: completed ? now : null,
                    atualizado_em: now,
                  }
                : step,
            ),
          })),
        },
      }));
    });

  function selectOption(index: number) {
    if (busy || session.revealed) return;
    setSession((previous) => ({ ...previous, selectedOption: index }));
  }
  function confirmAnswer() {
    if (busy || session.revealed || session.selectedOption === null || !questions[session.index])
      return;
    attemptRef.current = { id: newId(), answeredAt: new Date().toISOString() };
    setSession((previous) => ({ ...previous, revealed: true }));
  }
  function rateQuestion(difficulty: Difficulty) {
    if (!busy && session.revealed) setSession((previous) => ({ ...previous, rating: difficulty }));
  }
  async function goToNextQuestion(): Promise<boolean> {
    let finished = false;
    await run(async () => {
      const current = requireCredentials();
      const question = questions[session.index];
      const attempt = attemptRef.current;
      if (
        !question ||
        !attempt ||
        !session.revealed ||
        !session.rating ||
        session.selectedOption === null
      )
        return;
      const correct = session.selectedOption === question.correctIndex;
      const interval = correct ? getDifficultyOption(session.rating).intervalDays : 1;
      const date = new Date(attempt.answeredAt);
      date.setDate(date.getDate() + interval);
      const previous = (data.sync?.tentativas || [])
        .filter((item) => item.questao_id === question.id)
        .sort((a, b) => b.respondida_em.localeCompare(a.respondida_em))[0];
      const row = {
        id: attempt.id,
        questao_id: question.id,
        acertou: (correct ? 1 : 0) as 0 | 1,
        dificuldade_informada: session.rating === "hard" ? 1 : session.rating === "medium" ? 3 : 5,
        respondida_em: attempt.answeredAt,
        repeticoes: correct ? (previous?.repeticoes || 0) + 1 : 0,
        intervalo_dias: interval,
        fator_facilidade: previous?.fator_facilidade || 2.5,
        proxima_revisao: localDate(date),
      };
      const { id, ...payload } = row;
      await api.upload(current.token, [
        { id: 1, entidade: "tentativa_exercicio", entidade_id: id, operacao: "insert", payload },
      ]);
      setData((old) => ({
        ...old,
        sync: old.sync && {
          ...old.sync,
          tentativas: [...old.sync.tentativas.filter((item) => item.id !== id), row],
        },
      }));
      finished = session.index === questions.length - 1;
      setSession({ ...INITIAL_SESSION, index: finished ? 0 : session.index + 1 });
      attemptRef.current = null;
      setToastMessage(
        finished ? "Sessão salva! Confira seu desempenho." : "Resposta e próxima revisão salvas.",
      );
    });
    return finished;
  }

  async function startCycle(id: string) {
    const current = requireCredentials();
    const track = data.tracks.find((item) => item._id === id);
    if (!track || !track.materias.length)
      throw new Error("Esta trilha ainda não possui matérias para gerar um cronograma.");
    if (pendingCycle.current && pendingCycle.current.trackId !== id)
      throw new Error(
        "Conclua a tentativa anterior de criação de cronograma antes de trocar a trilha.",
      );
    pendingCycle.current ||= {
      trackId: id,
      operations: createScheduleOperations(track, activeSchedule),
    };
    await api.upload(current.token, pendingCycle.current.operations);
    pendingCycle.current = null;
    await load(current);
    setToastMessage("Cronograma salvo. Seu histórico anterior foi preservado.");
  }
  const selectTrack = (id: string) =>
    run(async () => {
      setTrackId(id);
      const track = data.tracks.find((item) => item._id === id);
      if (!credentialRef.current) {
        setToastMessage(`Trilha selecionada: ${track?.nome || id}`);
        return;
      }
      if (!track || !track.materias?.length) {
        setToastMessage(`Trilha alterada para ${track?.nome || id}.`);
        return;
      }
      if (id === activeSchedule?.trilha_id && !pendingCycle.current) return;
      await startCycle(id);
    });
  const resetProgress = () =>
    run(async () => {
      await startCycle(trackId);
    });
  const prepareForExam = (exam: Exam) =>
    run(async () => {
      const target = exam.trackIds?.includes(trackId) ? trackId : exam.trackId;
      if (target !== activeSchedule?.trilha_id) await startCycle(target);
      setSelectedExamId(null);
    });
  const saveProfile = (form: ProfileFormData) =>
    run(async () => {
      const current = requireCredentials();
      const result = await api.request<{ usuario: ApiUser; token?: string }>(
        "/conta",
        current.token,
        "PATCH",
        {
          nome: form.name.trim(),
          email: form.email.trim(),
          ...(form.password ? { novaSenha: form.password } : {}),
          ...(form.currentPassword ? { senhaAtual: form.currentPassword } : {}),
        },
      );
      if (result.token) {
        const next = { ...current, token: result.token };
        credentialRef.current = next;
        setCredentials(next);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      setData((old) => ({ ...old, sync: old.sync && { ...old.sync, usuario: result.usuario } }));
      setToastMessage("Perfil atualizado com sucesso!");
    });
  const deleteAccount = (password: string) =>
    run(async () => {
      const current = requireCredentials();
      await api.request("/conta/excluir", current.token, "POST", {
        confirmacao: "EXCLUIR",
        senha: password,
      });
      clearSession();
      await AsyncStorage.removeItem(STORAGE_KEY);
      setToastMessage("Conta excluída.");
    });
  const closeModals = () => {
    setActiveModal(null);
    setSelectedExamId(null);
  };

  return {
    user,
    tracks,
    exams: data.exams,
    allBlocks,
    scheduleBlocks,
    blocks,
    completedIds,
    answers,
    questions,
    session,
    ready,
    busy,
    error,
    isGuest,
    enterAsGuest,
    authenticated: !!credentials,
    hasData: !!data.sync,
    authenticate,
    refresh,
    logout,
    selectedExam: data.exams.find((exam) => exam.id === selectedExamId),
    activeModal,
    toastMessage,
    completedMinutes: getCompletedMinutes(blocks, completedIds),
    plannedMinutes: getPlannedMinutes(blocks),
    pendingReviews: getPendingReviewCount(answers),
    toggleBlock,
    selectOption,
    confirmAnswer,
    rateQuestion,
    goToNextQuestion,
    selectTrack,
    saveProfile,
    prepareForExam,
    resetProgress,
    deleteAccount,
    openExam: setSelectedExamId,
    openModal: setActiveModal,
    closeModals,
    showToast: setToastMessage,
    dismissToast: () => setToastMessage(""),
  };
}
const AppContext = createContext<ReturnType<typeof useAppState> | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const value = useAppState();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
