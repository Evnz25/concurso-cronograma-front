import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  AnswerRecord,
  Difficulty,
  Exam,
  ModalType,
  ProfileFormData,
  Question,
  QuestionSession,
  StudyBlock,
  TrackId,
  User,
} from "@/interfaces";
import { getExamById } from "@/services/examService";
import {
  INITIAL_SESSION,
  createAnswerRecord,
  getDifficultyOption,
  getQuestions,
  isLastQuestion,
  nextQuestion,
} from "@/services/questionService";
import {
  getCompletedMinutes,
  getPlannedMinutes,
  getTodayBlocks,
  toggleCompleted,
} from "@/services/scheduleService";
import { STATS_BASELINE, getPendingReviewCount } from "@/services/statsService";
import { DEFAULT_USER, EMPTY_USER } from "@/services/userService";

const STORAGE_KEY = "@aprovatech_data_v1";

interface AppContextValue {
  user: User;
  completedIds: string[];
  answers: AnswerRecord[];
  session: QuestionSession;
  blocks: StudyBlock[];
  questions: Question[];
  selectedExam: Exam | undefined;
  activeModal: ModalType | null;
  toastMessage: string;
  completedMinutes: number;
  plannedMinutes: number;
  pendingReviews: number;
  // Actions
  toggleBlock: (blockId: string) => void;
  selectOption: (index: number) => void;
  confirmAnswer: () => void;
  rateQuestion: (difficulty: Difficulty) => void;
  goToNextQuestion: () => boolean; // returns true if session finished
  selectTrack: (trackId: TrackId) => void;
  saveProfile: (data: ProfileFormData) => void;
  prepareForExam: (exam: Exam) => void;
  openExam: (examId: string) => void;
  openModal: (modal: ModalType) => void;
  closeModals: () => void;
  resetProgress: () => void;
  deleteAccount: () => void;
  showToast: (message: string) => void;
  dismissToast: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [blocks] = useState<StudyBlock[]>(getTodayBlocks());
  const [questions] = useState<Question[]>(getQuestions());

  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [completedIds, setCompletedIds] = useState<string[]>([getTodayBlocks()[0].id]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [session, setSession] = useState<QuestionSession>(INITIAL_SESSION);

  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  // Load persisted state
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const data = JSON.parse(json);
          if (data.user) setUser(data.user);
          if (Array.isArray(data.completedIds)) setCompletedIds(data.completedIds);
          if (Array.isArray(data.answers)) setAnswers(data.answers);
        }
      } catch (err) {
        console.warn("Failed to load persisted state:", err);
      }
    })();
  }, []);

  // Save state on change
  const persist = useCallback((u: User, c: string[], a: AnswerRecord[]) => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: u, completedIds: c, answers: a }),
    ).catch((err) => console.warn("Failed to persist state:", err));
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const dismissToast = useCallback(() => {
    setToastMessage("");
  }, []);

  const toggleBlock = useCallback(
    (blockId: string) => {
      setCompletedIds((prev) => {
        const next = toggleCompleted(prev, blockId);
        persist(user, next, answers);
        return next;
      });
    },
    [user, answers, persist],
  );

  const selectOption = useCallback((index: number) => {
    setSession((prev) => ({ ...prev, selectedOption: index }));
  }, []);

  const confirmAnswer = useCallback(() => {
    setSession((prev) => {
      const q = questions[prev.index];
      const newAnswer = createAnswerRecord(q, prev.selectedOption);
      setAnswers((a) => {
        const nextAnswers = [...a, newAnswer];
        persist(user, completedIds, nextAnswers);
        return nextAnswers;
      });
      return { ...prev, revealed: true };
    });
  }, [questions, user, completedIds, persist]);

  const rateQuestion = useCallback(
    (difficulty: Difficulty) => {
      setSession((prev) => ({ ...prev, rating: difficulty }));
      setAnswers((prev) => {
        const nextAnswers = prev.map((ans, i) =>
          i === prev.length - 1 ? { ...ans, difficulty } : ans,
        );
        persist(user, completedIds, nextAnswers);
        return nextAnswers;
      });
      showToast(`Revisão agendada: ${getDifficultyOption(difficulty).reviewLabel.toLowerCase()}.`);
    },
    [user, completedIds, persist, showToast],
  );

  const goToNextQuestion = useCallback((): boolean => {
    if (isLastQuestion(session, questions.length)) {
      showToast("Sessão concluída! Confira o seu desempenho.");
      return true;
    }
    setSession(nextQuestion);
    return false;
  }, [session, questions.length, showToast]);

  const selectTrack = useCallback(
    (trackId: TrackId) => {
      setUser((prev) => {
        const next = { ...prev, trackId };
        persist(next, completedIds, answers);
        return next;
      });
    },
    [completedIds, answers, persist],
  );

  const saveProfile = useCallback(
    (data: ProfileFormData) => {
      setUser((prev) => {
        const next = { ...prev, name: data.name, email: data.email };
        persist(next, completedIds, answers);
        return next;
      });
      showToast("Perfil atualizado com sucesso!");
    },
    [completedIds, answers, persist, showToast],
  );

  const prepareForExam = useCallback(
    (exam: Exam) => {
      selectTrack(exam.trackId);
      setSelectedExamId(null);
      showToast("Trilha ajustada para este concurso.");
    },
    [selectTrack, showToast],
  );

  const openExam = useCallback((examId: string) => {
    setSelectedExamId(examId);
  }, []);

  const openModal = useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);

  const closeModals = useCallback(() => {
    setActiveModal(null);
    setSelectedExamId(null);
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedIds([]);
    setAnswers([]);
    setSession(INITIAL_SESSION);
    persist(user, [], []);
    showToast("Novo cronograma iniciado!");
  }, [user, persist, showToast]);

  const deleteAccount = useCallback(() => {
    setUser(EMPTY_USER);
    setCompletedIds([]);
    setAnswers([]);
    setSession(INITIAL_SESSION);
    AsyncStorage.removeItem(STORAGE_KEY).catch(console.warn);
    showToast("Perfil demonstrativo excluído.");
  }, [showToast]);

  const completedMinutes = getCompletedMinutes(blocks, completedIds);
  const plannedMinutes = getPlannedMinutes(blocks);
  const pendingReviews = getPendingReviewCount(answers);
  const selectedExam = selectedExamId ? getExamById(selectedExamId) : undefined;

  return (
    <AppContext.Provider
      value={{
        user,
        completedIds,
        answers,
        session,
        blocks,
        questions,
        selectedExam,
        activeModal,
        toastMessage,
        completedMinutes,
        plannedMinutes,
        pendingReviews,
        toggleBlock,
        selectOption,
        confirmAnswer,
        rateQuestion,
        goToNextQuestion,
        selectTrack,
        saveProfile,
        prepareForExam,
        openExam,
        openModal,
        closeModals,
        resetProgress,
        deleteAccount,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
