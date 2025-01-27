import { forEach } from "mongoose/lib/helpers/specialProperties";
import { Evaluation } from "../../api";

/**
 * Calcola il numero medio di task svolti
 * Ritorna una stringa numerica con un solo decimale
 */
export const averageTasks = (evaluations: Evaluation[]) => {
  const total = evaluations.length;
  const completed = evaluations
    .map(
      (evaluation) =>
        Object.values(evaluation.task_svolti_correttamente).filter(
          (task) => task,
        ).length,
    )
    .reduce((acc, completed) => acc + completed, 0);
  const average = completed / total;
  return `${Math.round(average * 10) / 10}`;
};

/**
 * Calcola il voto medio
 * Ritorna una stringa numerica con un solo decimale
 */
export const averageRating = (evaluations: Evaluation[]) => {
  const total = evaluations.length;
  
  //Ciclo per calcolare la media delle valutazioni
  let sum = 0;
  for (let index = 0; index < total; index++) {
    sum = sum + evaluations[index].valutazione;
  }
  
  const average = sum / total;
  return `${Math.round(average * 10) / 10}`;
};
