import Router from "@koa/router";
import { Evaluation } from "../../api";
import {
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../services/evaluation";
import { averageRating, averageTasks } from "../lib/averages";
import { calculate } from "../lib/evaluation";


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
 * TODO: Task 1 - backend devo implementare l'api /api/average-evaluation per ottenere la media delle valutazioni
 */
router.get("/average-evaluation", async (ctx) => {
  try {
    const evaluations = await getEvaluations();

    if (evaluations.length === 0) {
      ctx.body = { tasks: "0", rating: "0" }; 
      return;
    }

    const ratingAverage = averageRating(evaluations);
    const tasksAverage = averageTasks(evaluations);

    ctx.body = {
      tasks: tasksAverage.toFixed(2), 
      rating: ratingAverage.toFixed(2), 
    };
  } catch (error) {
    console.error("Errore durante il calcolo delle medie:", error);
    ctx.status = 500;
    ctx.body = { error: "Errore durante il calcolo delle medie" };
  }
});


router.post("/calculate", async (ctx) => {
  try {
    const { tasks } = ctx.request.body;

    if (!tasks) {
      ctx.status = 400;
      ctx.body = { error: "I task svolti non sono stati forniti" };
      return;
    }

    const suggestedVote = calculate(tasks);

    ctx.body = { suggestedVote };
  } catch (error) {
    console.error("Errore durante il calcolo del voto:", error);
    ctx.status = 500;
    ctx.body = { error: "Errore durante il calcolo del voto" };
  }
});

export default router;
