import Router from "@koa/router";
import { Evaluation, Average } from "../../api";
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
 * TODO: Task 1 - backend
 */

router.get("/average-evaluation", async (ctx) => {
  const evaluations = await getEvaluations();
  const avgRating = averageRating(evaluations);
  const avgTasks = averageTasks(evaluations);
  const average: Average = {
    rating: avgRating,
    tasks: avgTasks,
  };
  ctx.body = average;
});

/**
 * TODO: Task 2 - backend
 */
router.post("/calculate", async (ctx) => {
  ctx.accepts("application/json");
  const tasks = ctx.request.body.tasks;
  const evaluation = Math.round(calculate(tasks));
  ctx.body = { evaluation };
});

export default router;
