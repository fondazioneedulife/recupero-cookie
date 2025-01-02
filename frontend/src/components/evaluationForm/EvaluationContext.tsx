import React, {
  createContext,
  PropsWithChildren,
  useDeferredValue,
} from "react";
import { Evaluation, Tasks } from "../../../../api";

type TEvaluationForm = {
  evaluation?: Evaluation;
  onSave: (evaluation: Evaluation) => void;
};

export type TEvaluationContext = {
  state: Evaluation;
  setState: React.Dispatch<React.SetStateAction<Evaluation>>;
  setTask: (
    property: keyof Tasks,
  ) => React.ChangeEventHandler<HTMLInputElement>;
  onSave: (evaluation: Evaluation) => void;
  note?: string;
  link?: string;
};

const emptyState: Evaluation = {
  nome: "",
  task_svolti_correttamente: {
    fork_commit_pr: false,
    task_1_frontend: false,
    task_1_backend: false,
    task_2_frontend: false,
    task_2_backend: false,
  },
  valutazione: 0,
  note: "",
  link: "",
};

export const EvaluationFormContext = createContext<TEvaluationContext>(
  {} as TEvaluationContext,
);

export const EvaluationContextProvider: React.FC<
  PropsWithChildren<TEvaluationForm>
> = ({ children, evaluation, onSave }) => {
  const [state, setState] = React.useState<Evaluation>(
    evaluation || emptyState,
  );
  const note = useDeferredValue(state.note);
  const link = useDeferredValue(state.link);

  const setTask =
    (property: keyof Tasks): React.ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setState((state) => ({
        ...state,
        task_svolti_correttamente: {
          ...state.task_svolti_correttamente,
          [property]: e.target.checked,
        },
      }));

  return (
    <EvaluationFormContext.Provider
      value={{
        state,
        setState,
        setTask,
        onSave,
        note,
        link,
      }}
    >
      {children}
    </EvaluationFormContext.Provider>
  );
};
