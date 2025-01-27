import Router from "@koa/router";
import { Evaluation, Tasks } from "../../api";
import {
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../services/evaluation";
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

router.get("/average-evaluation", async (ctx) => {
  const evaluations = await getEvaluations();
  const tasks = evaluations.length;
  const rating = evaluations.reduce((acc, e) => acc + e.valutazione, 0) / tasks;
  ctx.body = { tasks: tasks.toString(), rating: rating.toString() };
});

router.post("/calculate", async (ctx) => {
  const { tasksCompleted } = ctx.request.body as { tasksCompleted: Tasks };
  const suggestedVote =  calculate( tasksCompleted );
  ctx.body = { suggestedVote };
});


export default router;
