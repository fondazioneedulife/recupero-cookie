import { Tasks } from "../../api";
import { task_evaluations } from "../config";

/**
 * Calcola il voto totale sulla base dei task svolti
 * @param results TaskEvaluationApi lista dei task svolti
 * @returns number voto calcolato sulla base dei parametri di configurazione
 */
export const calculate = (results: Tasks) => {
  return Object.entries(results).reduce((acc, [task, value]) => {
    if (value) {
      acc += task_evaluations[task];
    }
    return acc;
  }, 0);
};
