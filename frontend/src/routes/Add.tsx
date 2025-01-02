import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Evaluation } from "../../../api";
import { ButtonSave } from "../components/evaluationForm/EvaluationButtonSave";
import { EvaluationContextProvider } from "../components/evaluationForm/EvaluationContext";
import { EvaluationForm } from "../components/evaluationForm/EvaluationForm";
import { EvaluationsContext } from "../components/EvaluationsContext";
import { config } from "../config";

export const Add: React.FC = () => {
  const navigate = useNavigate();
  const { reload } = useContext(EvaluationsContext);

  const save = (evaluation: Evaluation) => {
    fetch(`${config.API_BASEPATH}/api/evaluation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluation),
    })
      .then(reload)
      .then(() => {
        navigate("/");
      });
  };

  return (
    <EvaluationContextProvider onSave={save}>
      <Dialog
        open={true}
        onClose={() => {
          navigate("/");
        }}
        scroll="paper"
      >
        <DialogTitle>Aggiungi valutazione</DialogTitle>
        <DialogContent>
          <EvaluationForm />
        </DialogContent>
        <DialogActions>
          <ButtonSave />
        </DialogActions>
      </Dialog>
    </EvaluationContextProvider>
  );
};
