const { test } = require("node:test");
const assert = require("node:assert/strict");
const { loadTs } = require("./load-ts.cjs");
const { mapReviewDays } = loadTs("src/services/reviewService.ts");
const { getWeekDays } = loadTs("src/services/scheduleService.ts");
test("calendário mostra a agenda da API na trilha, inclusive atrasos e outras semanas", () => {
  const today = "2026-11-30";
  const catalog = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const agenda = [
    { questao_id: "b", vencimento: "2026-11-27" },
    { questao_id: "outra-trilha", vencimento: today },
    { questao_id: "c", vencimento: today },
    { questao_id: "a", vencimento: "2026-12-07" },
  ];
  const calendar = mapReviewDays(catalog, agenda, today);
  assert.deepEqual(
    calendar.get(today).map((item) => item.question.id),
    ["b", "c"],
  );
  assert.equal(calendar.get(today)[0].due, "2026-11-27");
  assert.equal(calendar.size, 2);
  const week = getWeekDays(new Date(2026, 11, 7), [], today, new Set(calendar.keys()));
  assert.equal(week[0].hasStudy, true);
  assert.equal(week[0].hasSimulation, true);
  assert.equal(week[1].hasSimulation, false);
  assert.equal(week[0].isToday, false);
});
