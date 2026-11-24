import type { AnswerRecord, Exam, Question, StudyBlock, Track } from "../interfaces";
import type { ApiAttempt, ApiExam, ApiQuestion, ApiSchedule, ApiTrack } from "../interfaces/Api";
import type { IconName } from "../interfaces/Icon";

export function getSubjectIcon(id: string, name: string): IconName {
  const norm = `${id} ${name}`.toLowerCase();
  if (
    norm.includes("dev") ||
    norm.includes("software") ||
    norm.includes("program") ||
    norm.includes("lógica") ||
    norm.includes("logica") ||
    norm.includes("algoritm")
  )
    return "code";
  if (norm.includes("rede") || norm.includes("infra")) return "server";
  if (norm.includes("dado") || norm.includes("data") || norm.includes("bd") || norm.includes("sql"))
    return "database";
  if (norm.includes("seg") || norm.includes("shield")) return "shield";
  if (norm.includes("gov") || norm.includes("gest") || norm.includes("briefcase"))
    return "briefcase";
  return "book";
}

function getTrackDetail(track: ApiTrack): string {
  if (track.materias && track.materias.length > 0) {
    return track.materias.map((subject) => subject.nome).join(" · ");
  }
  const norm = `${track._id} ${track.nome}`.toLowerCase();
  if (norm.includes("seg")) return "Segurança da Informação e Defesa Cibernética";
  if (norm.includes("gov")) return "Governança e Gestão de TI";
  if (norm.includes("dado")) return "Banco de Dados e Ciência de Dados";
  return "Trilha de estudos especializada";
}

export function mapTrack(track: ApiTrack): Track {
  return {
    id: track._id,
    name: track.nome,
    shortName: track.nome.split("/")[0].trim(),
    detail: getTrackDetail(track),
    icon: getSubjectIcon(track._id, track.nome),
  };
}
export function mapQuestion(question: ApiQuestion, tracks: ApiTrack[]): Question {
  const track = tracks.find((item) =>
    item.materias.some((subject) => subject._id === question.materiaId),
  );
  const subject = track?.materias.find((item) => item._id === question.materiaId);
  const theme = subject?.temas.find((item) => item._id === question.temaId);
  return {
    id: question._id,
    trackId: track?._id,
    subjectId: question.materiaId,
    themeId: question.temaId,
    theme: theme?.nome || question.temaId,
    topic: subject?.nome || question.materiaId,
    source: `${question.banca} · ${question.ano}`,
    sourceUrl: question.fonteUrl,
    text: question.enunciado,
    options: question.alternativas,
    correctIndex: question.gabarito.charCodeAt(0) - 65,
    explanation: `Gabarito: alternativa ${question.gabarito}. A API não disponibiliza resolução comentada.`,
  };
}
export function mapExam(exam: ApiExam, tracks: ApiTrack[]): Exam {
  return {
    id: exam._id,
    org: exam.orgao
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 4),
    name: exam.orgao,
    job: exam.cargo,
    place: exam.localizacao,
    salary: exam.salario ?? null,
    registrationDeadline: exam.fimEdital.slice(0, 10),
    trackId: exam.trilhaIds[0] || "",
    trackIds: exam.trilhaIds,
    trackNames: exam.trilhaIds
      .map((id) => tracks.find((t) => t._id === id)?.nome || id)
      .join(" · "),
    color: "blue",
    vacancies: null,
    description: "Consulte o edital para os requisitos e as informações completas.",
    sourceUrl: exam.editalUrl,
  };
}
export function mapBlocks(schedules: ApiSchedule[], tracks: ApiTrack[]): StudyBlock[] {
  return schedules.flatMap((schedule) => {
    const subjects = tracks.find((track) => track._id === schedule.trilha_id)?.materias ?? [];
    const weights = new Map(schedule.pesos.map((item) => [item.materia_id, item.peso]));
    const minutes = new Map<string, number>();
    for (const step of schedule.etapas) {
      minutes.set(step.materia_id, (minutes.get(step.materia_id) ?? 0) + step.duracao_min);
    }
    return schedule.etapas.map((step) => ({
      id: step.id,
      scheduleId: schedule.id,
      subjectId: step.materia_id,
      subjectWeight: weights.get(step.materia_id),
      weeklyMinutes: minutes.get(step.materia_id),
      date: step.data,
      completed: step.concluida === 1,
      completedAt: step.concluida_em,
      title: subjects.find((subject) => subject._id === step.materia_id)?.nome || step.materia_id,
      topic: "",
      breakAfterMinutes: step.pausa_min,
      startTime: "",
      durationMinutes: step.duracao_min,
      icon: "book" as const,
      color: "purple" as const,
      tag: "Estudo",
      isSrsReview: false,
    }));
  });
}
export function mapAttempt(attempt: ApiAttempt, questions: Question[]): AnswerRecord {
  const question = questions.find((item) => item.id === attempt.questao_id);
  return {
    id: attempt.id,
    questionId: attempt.questao_id,
    themeId: question?.themeId || attempt.questao_id,
    theme: question?.theme || "Questão fora do catálogo",
    correct: attempt.acertou === 1,
    answeredAt: attempt.respondida_em,
    nextReview: attempt.proxima_revisao,
    ...(attempt.dificuldade_informada == null
      ? {}
      : {
          difficulty:
            attempt.dificuldade_informada <= 2
              ? ("hard" as const)
              : attempt.dificuldade_informada <= 3
                ? ("medium" as const)
                : ("easy" as const),
        }),
  };
}
// Gerado uma vez por operação e reutilizado ao tentar o envio novamente.
export function newId(): string {
  return `app-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}
