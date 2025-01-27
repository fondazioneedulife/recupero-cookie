import { Evaluation } from "../../api";

export const averageRating = (evaluations: Evaluation[]): number => {
  const totalRating = evaluations.reduce(
    (acc, curr) => acc + (curr.valutazione || 0),
    0
  );
  return evaluations.length ? totalRating / evaluations.length : 0;
};

export const averageTasks = (evaluations: Evaluation[]): number => {
  const totalTasks = evaluations.reduce((acc, curr) => {
    const tasks = curr.task_svolti_correttamente || {};
    const completedTasks = Object.values(tasks).filter(Boolean).length;
    return acc + completedTasks;
  }, 0);
  return evaluations.length ? totalTasks / evaluations.length : 0;
};

type Tasks = {
  fork_commit_pr: boolean;
  task_1_frontend: boolean;
  task_1_backend: boolean;
  task_2_frontend: boolean;
  task_2_backend: boolean;
};

export const calculate = (tasks: Tasks): number => {
  const taskValues = Object.values(tasks);
  const completedTasks = taskValues.filter((task) => task).length;

  return Math.min(completedTasks * 2, 10); 
};
