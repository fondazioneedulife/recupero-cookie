import { Evaluation } from "../../api";
import DB from "../lib/db";

const schema = new DB.Schema<Evaluation>(
  {
    nome: { type: String, required: true },
    task_svolti_correttamente: {
      fork_commit_pr: { type: Boolean },
      task_1_frontend: { type: Boolean },
      task_1_backend: { type: Boolean },
      task_2_frontend: { type: Boolean },
      task_2_backend: { type: Boolean },
    },
    valutazione: { type: Number },
    note: { type: String },
    link: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const EvaluationModel = DB.model("evaluation", schema);

export const getEvaluations = async () => {
  return EvaluationModel.find();
};

export const getEvaluation = async (id: string) => {
  return EvaluationModel.findById(id);
};

export const createEvaluation = async (evaluation: Evaluation) => {
  return EvaluationModel.create(evaluation);
};

export const updateEvaluation = async (id: string, evaluation: Evaluation) => {
  return EvaluationModel.findByIdAndUpdate(id, evaluation);
};

export const deleteEvaluation = async (id: string) => {
  return EvaluationModel.findByIdAndDelete(id);
};
