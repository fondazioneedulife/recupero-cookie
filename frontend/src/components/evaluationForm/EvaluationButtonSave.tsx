import { useContext } from "react";
import { EvaluationFormContext } from "./EvaluationContext";

export const ButtonSave: React.FC = () => {
  const { state, onSave } = useContext(EvaluationFormContext);
  return (
    <button type="submit" onClick={() => onSave(state)}>
      Salva valutazione
    </button>
  );
};
