import { Tasks } from "../../api";
import { task_evaluations } from "../config";

/**
 * Calcola il voto totale sulla base dei task svolti
 * @param results Tasks - Lista dei task svolti dall'utente (true/false)
 * @returns number - Voto calcolato in base alla configurazione
 */


export const calculate = (results: Tasks) => {
  return Object.entries(results).reduce((acc, [task, value]) => {
    // value è un boolean: se true, l'utente ha svolto il task
    if (value) {
      // Somma il punteggio definito in config per quel determinato task
      acc += task_evaluations[task];
    }
    return acc;
  }, 0);
};