import Router from "@koa/router";
import { Evaluation } from "../../api";
import {
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../services/evaluation";
import { averageRating, averageTasks } from '../lib/averages'; // Importa le funzioni per calcolare le medie

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

/**
 * Task 1 - Implementazione dell'API /api/average-evaluation
 */
router.get("/average-evaluation", async (ctx) => {
  try {
    const evaluations = await getEvaluations();
    const avgRating = averageRating(evaluations);
    const avgTasks = averageTasks(evaluations);
    ctx.body = {
      averageRating: avgRating,
      averageTasks: avgTasks,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Errore nel calcolare la media delle valutazioni';
  }
});

export default router;
