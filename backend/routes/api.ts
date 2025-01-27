import Router from "@koa/router";
import { Evaluation } from "../../api";
import { Average } from "../../api/evaluation"; 
import {
  createEvaluation,
  deleteEvaluation,
  getEvaluation,
  getEvaluations,
  updateEvaluation,
} from "../services/evaluation";
import { averageRating, averageTasks } from "../lib/averages";

// Importa la funzione di calcolo del punteggio
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
 * implementiamo la rotta per /api/average-evaluation
 */
router.get("/average-evaluation", async (ctx) => {
  // recuperiamo tutte le valutazioni dal service
  const evaluations = await getEvaluations();

  // calcoliamo la media dei rating e la media dei task
  const rating = averageRating(evaluations); // restituisce un number
  const tasks = averageTasks(evaluations);   // restituisce un number

  // creiamo un oggetto di tipo Average
  // Average prevede campi in formato string, quindi convertiamo i numeri
  const average: Average = {
    rating: rating.toString(),
    tasks: tasks.toString(),
  };

  // restituiamo l'oggetto
  ctx.body = average;
});

/**
 * Task 2 - backend
 * Aggiungiamo la rotta /api/calculate
 * Calcoliamo la valutazione basata sui task svolti.
 */
router.post("/calculate", async (ctx) => {
  // Recuperiamo i task svolti dal body della richiesta
  const { tasks } = ctx.request.body;

  // Calcoliamo la valutazione utilizzando la funzione calculate
  const evaluationResult = calculate(tasks);

  // Restituiamo il risultato della valutazione come numero
  ctx.body = { suggestedVote: evaluationResult };
});

export default router;
