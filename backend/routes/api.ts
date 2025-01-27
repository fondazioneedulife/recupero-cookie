import Router from "@koa/router";
import { Evaluation } from "../../api";
import {
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
  calculateAverageEvaluation,
} from "../services/evaluation";
import { calculate } from "../lib/evaluation"; // Importa la funzione di calcolo

const router = new Router({
  prefix: "/api",
});

router.get("/evaluations", async (ctx) => {
  const evaluations = await getEvaluations();
  ctx.body = evaluations;
});

router.get("/evaluation/:id", async (ctx) => {
  const evaluation = await getEvaluation(ctx.params.id);
  ctx.body = evaluation;
});

router.post("/evaluation", async (ctx) => {
  const evaluation = ctx.request.body as Evaluation;
  const createdEvaluation = await createEvaluation(evaluation);
  ctx.body = createdEvaluation;
});

router.put("/evaluation/:id", async (ctx) => {
  const evaluation = ctx.request.body as Evaluation;
  const updatedEvaluation = await updateEvaluation(ctx.params.id, evaluation);
  ctx.body = updatedEvaluation;
});

router.delete("/evaluation/:id", async (ctx) => {
  await deleteEvaluation(ctx.params.id);
  ctx.body = { message: "Evaluation deleted" };
});

export type Average = {
  tasks: string;
  rating: string;
};
export type Evaluation = {
  id: string;
  tasks: number;
  rating: number;
};

router.get("/average-evaluation", async (ctx) => {
  try {
    const average = await calculateAverageEvaluation();
    ctx.body = average;
  } catch (error) {
    console.error("Error fetching average evaluation:", error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch average evaluation" };
  }
});

router.post("/calculate", async (ctx) => {
  try {
    const { task_svolti_correttamente } = ctx.request.body;

    if (!task_svolti_correttamente) {
      ctx.status = 400;
      ctx.body = { message: "Task svolti correttamente non forniti" };
      return;
    }

    const valutazione = calculate(task_svolti_correttamente);

    ctx.body = { voto_suggerito: Math.round(valutazione) };
  } catch (error) {
    console.error("Errore durante il calcolo della valutazione:", error);
    ctx.status = 500;
    ctx.body = { message: "Errore interno durante il calcolo della valutazione" };
  }
});

export default router;
