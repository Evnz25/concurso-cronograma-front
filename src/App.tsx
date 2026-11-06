import { useState } from "react";
import type {
  AnswerRecord,
  Difficulty,
  Exam,
  ModalType,
  PageId,
  ProfileFormData,
  QuestionSession,
  TrackId,
  User,
} from "@/interfaces";
import { Toast } from "@/components/common/Toast";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ConfirmActionModal } from "@/components/modals/ConfirmActionModal";
import { ExamDetailsModal } from "@/components/modals/ExamDetailsModal";
import { HelpModal } from "@/components/modals/HelpModal";
import { NotificationsModal } from "@/components/modals/NotificationsModal";
import { useToast } from "@/hooks/useToast";
import { getExamById } from "@/services/examService";
import { getNavigation, getPageTitle } from "@/services/navigationService";
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
import { HomeView } from "@/views/HomeView";
import { ProfileView } from "@/views/ProfileView";
import { QuestionsView } from "@/views/QuestionsView";
import { StatsView } from "@/views/StatsView";
import { StudyView } from "@/views/StudyView";

const navigation = getNavigation();
const blocks = getTodayBlocks();
const questions = getQuestions();

export default function App() {
  const [page, setPage] = useState<PageId>("home");
  const [user, setUser] = useState<User>(DEFAULT_USER);
  /** Incrementado ao excluir a conta para reiniciar o formulário de perfil. */
  const [accountVersion, setAccountVersion] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([blocks[0].id]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [session, setSession] = useState<QuestionSession>(INITIAL_SESSION);
  const [modal, setModal] = useState<ModalType | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const toast = useToast();

  const completedMinutes = getCompletedMinutes(blocks, completedIds);
  const plannedMinutes = getPlannedMinutes(blocks);
  const pendingReviews = getPendingReviewCount(answers);
  const selectedExam = selectedExamId ? getExamById(selectedExamId) : undefined;

  const navigate = (id: PageId) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeDialogs = () => {
    setModal(null);
    setSelectedExamId(null);
  };

  const toggleBlock = (blockId: string) =>
    setCompletedIds((prev) => toggleCompleted(prev, blockId));

  // --- Sessão de questões -------------------------------------------------
  const selectOption = (index: number) =>
    setSession((prev) => ({ ...prev, selectedOption: index }));

  const confirmAnswer = () => {
    const question = questions[session.index];
    setAnswers((prev) => [
      ...prev,
      createAnswerRecord(question, session.selectedOption),
    ]);
    setSession((prev) => ({ ...prev, revealed: true }));
  };

  const rateQuestion = (difficulty: Difficulty) => {
    setSession((prev) => ({ ...prev, rating: difficulty }));
    setAnswers((prev) =>
      prev.map((answer, i) =>
        i === prev.length - 1 ? { ...answer, difficulty } : answer,
      ),
    );
    toast.notify(
      `Revisão agendada: ${getDifficultyOption(difficulty).reviewLabel.toLowerCase()}.`,
    );
  };

  const goToNextQuestion = () => {
    if (isLastQuestion(session, questions.length)) {
      navigate("stats");
      toast.notify("Sessão concluída! Confira o seu desempenho.");
    } else {
      setSession(nextQuestion);
    }
  };

  // --- Perfil e conta -----------------------------------------------------
  const selectTrack = (trackId: TrackId) =>
    setUser((prev) => ({ ...prev, trackId }));

  const saveProfile = (data: ProfileFormData) => {
    setUser((prev) => ({ ...prev, name: data.name, email: data.email }));
    toast.notify("Perfil e trilha atualizados nesta demonstração.");
  };

  const prepareForExam = (exam: Exam) => {
    selectTrack(exam.trackId);
    setSelectedExamId(null);
    navigate("study");
    toast.notify("Trilha ajustada para esta oportunidade.");
  };

  const resetProgress = () => {
    setCompletedIds([]);
    setAnswers([]);
    setSession(INITIAL_SESSION);
  };

  const confirmAccountAction = (action: "reset" | "delete") => {
    resetProgress();
    if (action === "delete") {
      setUser(EMPTY_USER);
      setAccountVersion((v) => v + 1);
      navigate("profile");
      toast.notify("Perfil demonstrativo excluído. Você pode começar de novo.");
    } else {
      navigate("study");
      toast.notify("Novo cronograma iniciado. Vamos recomeçar!");
    }
    setModal(null);
  };

  return (
    <div className="app-shell">
      <Sidebar
        items={navigation}
        page={page}
        userName={user.name}
        pendingReviews={pendingReviews}
        onNavigate={navigate}
        onOpenHelp={() => setModal("help")}
      />

      <div className="main-shell">
        <Topbar
          title={getPageTitle(page)}
          userName={user.name}
          streakDays={STATS_BASELINE.focusStreakDays}
          onOpenNotifications={() => setModal("notifications")}
          onOpenProfile={() => navigate("profile")}
        />
        <main>
          {page === "home" && (
            <HomeView
              user={user}
              blocks={blocks}
              completedIds={completedIds}
              completedMinutes={completedMinutes}
              plannedMinutes={plannedMinutes}
              answers={answers}
              onToggleBlock={toggleBlock}
              onNavigate={navigate}
              onSelectExam={setSelectedExamId}
            />
          )}
          {page === "study" && (
            <StudyView
              blocks={blocks}
              completedIds={completedIds}
              rating={session.rating}
              onToggleBlock={toggleBlock}
            />
          )}
          {page === "questions" && (
            <QuestionsView
              questions={questions}
              session={session}
              answers={answers}
              onSelectOption={selectOption}
              onConfirm={confirmAnswer}
              onRate={rateQuestion}
              onNext={goToNextQuestion}
            />
          )}
          {page === "stats" && (
            <StatsView answers={answers} completedMinutes={completedMinutes} />
          )}
          {page === "profile" && (
            <ProfileView
              key={accountVersion}
              user={user}
              onSelectTrack={selectTrack}
              onSave={saveProfile}
              onOpenModal={setModal}
            />
          )}
        </main>
      </div>

      <MobileNav items={navigation} page={page} onNavigate={navigate} />
      <Toast message={toast.message} onClose={toast.dismiss} />

      {selectedExam && (
        <ExamDetailsModal
          exam={selectedExam}
          onClose={closeDialogs}
          onPrepare={prepareForExam}
        />
      )}
      {!selectedExam && modal === "notifications" && (
        <NotificationsModal
          pendingReviews={pendingReviews}
          pendingBlocks={blocks.length - completedIds.length}
          onClose={closeDialogs}
          onStartReview={() => {
            setModal(null);
            navigate("questions");
          }}
        />
      )}
      {!selectedExam && modal === "help" && (
        <HelpModal onClose={closeDialogs} />
      )}
      {!selectedExam && (modal === "reset" || modal === "delete") && (
        <ConfirmActionModal
          variant={modal}
          onClose={closeDialogs}
          onConfirm={() => confirmAccountAction(modal)}
        />
      )}
    </div>
  );
}
