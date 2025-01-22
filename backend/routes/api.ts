import Router from "@koa/router";
import { Evaluation } from "../../api";
import {
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../services/evaluation";

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
 * TODO: Task 1 - backend
 * Scrivi l'api /api/average-evaluation per ottenere la media delle valutazioni
 * - ottieni tutte le valutazioni con services/evaluation.getEvaluations
 * - calcola la media delle valutazioni con lib/averages.averageRating
 * - calcola la media dei task svolti con lib/averages.averageTasks
 * - ritorna un oggetto di tipo Average con le due medie (il tipo Average lo trovi in api/evaluation.ts)
 */

/**
 * TODO: Task 2 - backend
 * Scrivi l'api /api/calculate per calcolare la valutazione di un compito
 * - recupera i task svolti dal body della richiesta
 * - calcola la valutazione con lib/evaluation.calculate
 * - ritorna la valutazione (un numero intero)
 */

export default router;
