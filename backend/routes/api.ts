import Router from "@koa/router";
import { Average, Evaluation } from "../../api";
import {
  averageTasks,
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../services/evaluation";
import { averageRating } from "../lib/averages";

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

router.get("/average-evaluation", async (ctx) => {
  try {
    // Ottieni tutte le valutazioni
    const evaluations = await getEvaluations();

    // Calcola la media delle valutazioni
    const averageRatingValue = averageRating(evaluations);

    // Calcola la media dei task svolti
    const averageTasksValue = averageTasks(evaluations);

    // Crea l'oggetto Average
    const result: Average = {
      averageRating: averageRatingValue,
      averageTasks: averageTasksValue,
    };

    // Restituisci il risultato
    ctx.body = result;
    console.log(result)
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Errore durante il calcolo delle medie." };
  }
});

/**
 * TODO: Task 2 - backend
 */

export default router;