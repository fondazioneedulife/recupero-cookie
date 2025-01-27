
export type Tasks = {
  fork_commit_pr: boolean;
  task_1_frontend: boolean;
  task_1_backend: boolean;
  task_2_frontend: boolean;
  task_2_backend: boolean;
};

export type Evaluation = {
  _id?: string;

  nome: string;

  task_svolti_correttamente: Tasks;

  valutazione: number;

  note: string;

  link: string;
};

export type Average = {
  tasks: string;
  rating: string;
};
