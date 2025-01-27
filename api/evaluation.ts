/**
 * Task svolti correttamente
 */
export type Tasks = {
  fork_commit_pr: boolean;
  task_1_frontend: boolean;
  task_1_backend: boolean;
  task_2_frontend: boolean;
  task_2_backend: boolean;
};

export type Evaluation = {
  _id?: string;
  /**
   * Nome dello studente
   */
  nome: string;
  /**
   * Task svolti correttamente
   */
  task_svolti_correttamente: Tasks;
  /**
   * Valutazione complessiva
   */
  valutazione: number;
  /**
   * Note del docente
   */
  note: string;
  /**
   * Link alla PR o, se assente, al repository dello studente o altro file pervenuto
   */
  link: string;
};


export type Average = {
  tasks: string;
  rating: string;
};