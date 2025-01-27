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
  // Verifichiamo che ci sia almeno 1 valutazione, altrimenti evitiamo divisioni per zero
  if (evaluations.length === 0) {
    return "0";
  }

  const total = evaluations.length;

  // Sommiamo i voti di tutte le valutazioni
  const sum = evaluations.reduce((acc, evaluation) => {
    return acc + evaluation.valutazione;
  }, 0);

  // Calcoliamo la media
  const average = sum / total;

  // Arrotondiamo a un solo decimale e lo convertiamo in stringa
  return `${Math.round(average * 10) / 10}`;
};
