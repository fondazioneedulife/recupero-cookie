import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Evaluation } from "../../../api";
import { config } from "../config";

type TEvaluationContext = {
  reload: () => void;
  evaluations: Evaluation[];
};

export const EvaluationsContext = createContext<TEvaluationContext>({
  reload: () => {},
  evaluations: [],
});

const loadEvaluations = () =>
  fetch(`${config.API_BASEPATH}/api`).then((res) => res.json());

export const EvaluationsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<Evaluation[]>([]);

  useEffect(() => {
    loadEvaluations().then((data) => setState(data));
  }, []);

  const reload = () => {
    loadEvaluations().then((data) => setState(data));
  };

  return (
    <EvaluationsContext.Provider value={{ reload, evaluations: state }}>
      {children}
    </EvaluationsContext.Provider>
  );
};
