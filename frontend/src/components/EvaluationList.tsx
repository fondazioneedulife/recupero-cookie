import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Evaluation } from "../../../api";
import { evaluateBadgeColor } from "../lib/evaluateColor";
import styles from "./EvaluationList.module.css";
import { EvaluationsContext } from "./EvaluationsContext";

export const EvaluationList: React.FC = () => {
  const navigate = useNavigate();
  const { evaluations } = useContext(EvaluationsContext);

  const taskSvolti = (evaluation: Evaluation) => {
    const total = Object.keys(evaluation.task_svolti_correttamente).length;
    const completed = Object.values(
      evaluation.task_svolti_correttamente,
    ).filter((task) => task).length;
    return `${completed}/${total}`;
  };

  const mediaTaskSvolti = (evaluations: Evaluation[]) => {
    const total = evaluations.length;
    const completed = evaluations
      .map(
        (evaluation) =>
          Object.values(evaluation.task_svolti_correttamente).filter(
            (task) => task,
          ).length,
      )
      .reduce((acc, completed) => acc + completed, 0);
    return `${Math.round((completed / total) * 10) / 10}`;
  };

  const mediaValutazioni = (evaluations: Evaluation[]) => {
    const total = evaluations.length;
    const completed = evaluations
      .map((evaluation) => evaluation.valutazione)
      .reduce((acc, valutazione) => acc + valutazione, 0);
    return `${Math.round((completed / total) * 10) / 10}`;
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>Valutazioni</h1>
        <button onClick={() => navigate("/add")}>
          Aggiungi una valutazione
        </button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Task svolti</TableCell>
            <TableCell>Valutazione</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Azioni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {evaluations.map((evaluation) => (
            <TableRow key={evaluation._id}>
              <TableCell>{evaluation.nome}</TableCell>
              <TableCell>{taskSvolti(evaluation)}</TableCell>
              <TableCell>
                <div
                  className={evaluateBadgeColor(evaluation.valutazione).join(
                    " ",
                  )}
                >
                  {evaluation.valutazione}
                </div>
              </TableCell>
              <TableCell>{evaluation.note}</TableCell>
              <TableCell>
                <Link href={evaluation.link} target="_blank">
                  Visualizza
                </Link>
              </TableCell>
              <TableCell>
                <button onClick={() => navigate(`/edit/${evaluation._id}`)}>
                  Modifica
                </button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Media</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              {mediaTaskSvolti(evaluations)}
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              {mediaValutazioni(evaluations)}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
