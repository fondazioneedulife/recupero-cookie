import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Average, Evaluation } from "../../../api";
import { config } from "../config";

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

const getAverage = async() => {
  try {
    const response = await fetch(`${config.API_BASEPATH}/api/average-evaluation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data: Average = await response.json();
    return {
      tasks: data.tasks,
      rating: data.rating,
    } as Average;

  } catch (error) {
    console.error("Errore nel fetching della media:", error);
  }
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
