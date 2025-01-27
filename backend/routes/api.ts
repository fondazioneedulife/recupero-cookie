import Router from "@koa/router";
import { Average, Evaluation } from "../../api";
import {averageRating, averageTasks } from "../lib/averages"
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

router.get("/average-evaluation", async (ctx) => {
  const allEvaluation = await getEvaluations();
  const avgRating = averageRating(allEvaluation as Evaluation[])
  const avgTasks = averageTasks(allEvaluation as Evaluation[])

  ctx.body = {
    tasks: avgTasks,
    rating: avgRating
  } as Average
});

/**
 * TODO: Task 2 - backend
 */

export default router;
