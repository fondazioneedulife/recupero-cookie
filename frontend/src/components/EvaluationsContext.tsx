import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { config } from "../config";

export type Average = {
  tasks: string;
  rating: string;
};

export type Evaluation = {
  id: string;
  tasks: number;
  rating: number;
};

type TEvaluationContext = {
  reload: () => void;
  evaluations: Evaluation[];
  average: Average;
};

export const EvaluationsContext = createContext<TEvaluationContext>({
  reload: () => {},
  evaluations: [],
  average: { tasks: "0", rating: "0" },
});

const loadEvaluations = () =>
  fetch(`${config.API_BASEPATH}/api/evaluations`).then((res) => res.json());

const getAverage = () => {
  return fetch(`${config.API_BASEPATH}/api/average-evaluation`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch average evaluation");
      }
      return res.json();
    })
    .then((data: Average) => data)
    .catch((error) => {
      console.error("Error fetching average evaluation:", error);
      return { tasks: "0", rating: "0" } as Average;
    });
};

export const EvaluationsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [average, setAverage] = useState<Average>({
    tasks: "0",
    rating: "0",
  });

  const callAPI = () => {
    loadEvaluations().then((data) => setEvaluations(data));
    getAverage().then((data) => setAverage(data));
  };

  useEffect(callAPI, []);

  const reload = callAPI;

  const value = useMemo(
    () => ({ reload, evaluations, average }),
    [reload, evaluations, average],
  );
  return (
    <EvaluationsContext.Provider value={value}>
      {children}
    </EvaluationsContext.Provider>
  );
};

