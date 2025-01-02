import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Evaluation } from "../../../api";
import { ButtonSave } from "../components/evaluationForm/EvaluationButtonSave";
import { EvaluationContextProvider } from "../components/evaluationForm/EvaluationContext";
import { EvaluationForm } from "../components/evaluationForm/EvaluationForm";
import { EvaluationsContext } from "../components/EvaluationsContext";
import { config } from "../config";

export const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reload } = useContext(EvaluationsContext);

  const [state, setState] = useState<Evaluation | undefined>();
  useEffect(() => {
    fetch(`${config.API_BASEPATH}/api/evaluation/${id}`)
      .then((res) => res.json())
      .then((data) => setState(data));
  }, [id]);

  const save = (evaluation: Evaluation) => {
    fetch(`${config.API_BASEPATH}/api/evaluation/${id}`, {
      method: "PUT",
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

  if (!state) {
    return "loading...";
  }

  return (
    <EvaluationContextProvider evaluation={state} onSave={save}>
      <Dialog
        open={true}
        onClose={() => {
          navigate("/");
        }}
        scroll="paper"
      >
        <DialogTitle>Modifica valutazione</DialogTitle>
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
