import { Slider, Typography } from "@mui/material";
import { Mark } from "@mui/material/Slider/useSlider.types";
import React, { useContext, useEffect, useState } from "react";
import { Evaluation } from "../../../../api";
import { evaluateBadgeColor } from "../../lib/evaluateColor";
import { EvaluationFormContext, TEvaluationContext } from "./EvaluationContext";
import styles from "./EvaluationForm.module.css";
import { config } from "../../config";


export const EvaluationForm: React.FC = () => {
  const { state, setState, setTask, note, link, onSave } = useContext(
    EvaluationFormContext,
  ) as TEvaluationContext;

  const [suggestedVote, setSuggestedVote] = useState(0);

  // Voto suggerito, riportato sullo slider
  const sliderMarks: Mark[] = [
    { value: suggestedVote, label: `Voto suggerito: ${suggestedVote}` },
  ];

  useEffect(() => {
    const setSuggested = async() => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/api/calculate`, {
          method: "POST",
          body: JSON.stringify(state.task_svolti_correttamente),
          headers: { "Content-Type": "application/json" },
        });
      
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSuggestedVote(data);

      } catch (error) {
        console.error("Errore nel fetching della media:", error);
      }
    };
    setSuggested()

  }, [state.task_svolti_correttamente]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSave(state as Evaluation);
      }}
    >
      <h2>Nome dello studente</h2>
      <input
        type="text"
        value={state.nome}
        onChange={(e) =>
          setState((state) => ({ ...state, nome: e.target.value }))
        }
      />
      <h2>Task svolti correttamente</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={state.task_svolti_correttamente.fork_commit_pr}
            onChange={setTask("fork_commit_pr")}
          />
          fork_commit_pr
        </label>
        <label>
          <input
            type="checkbox"
            checked={state.task_svolti_correttamente.task_1_frontend}
            onChange={setTask("task_1_frontend")}
          />
          task_1_frontend
        </label>
        <label>
          <input
            type="checkbox"
            checked={state.task_svolti_correttamente.task_1_backend}
            onChange={setTask("task_1_backend")}
          />
          task_1_backend
        </label>
        <label>
          <input
            type="checkbox"
            checked={state.task_svolti_correttamente.task_2_frontend}
            onChange={setTask("task_2_frontend")}
          />
          task_2_frontend
        </label>
        <label>
          <input
            type="checkbox"
            checked={state.task_svolti_correttamente.task_2_backend}
            onChange={setTask("task_2_backend")}
          />
          task_2_backend
        </label>
      </div>
      <h2>
        Valutazione complessiva:{" "}
        <span className={evaluateBadgeColor(state.valutazione)}>
          {state.valutazione}
        </span>
      </h2>
      <Slider
        step={1}
        min={0}
        max={10}
        marks={true}
        valueLabelDisplay="auto"
        value={state.valutazione}
        marks={sliderMarks}
        onChange={(e) => {
          setState((state) => ({
            ...state,
            valutazione: Number(e.target.value),
          }));
        }}
      />
      <div className={styles.note}>
        La valutazione può essere modificata a piacere dal docente, il voto
        calcalato sulla base dei task svolti è solo un suggerimento
      </div>

      <h2>Note del docente</h2>
      <div className={styles.fullWidth}>
        <textarea
          value={note}
          onChange={(e) =>
            setState((state) => ({ ...state, note: e.target.value }))
          }
        ></textarea>
      </div>
      <h2>Link</h2>
      <div className={styles.fullWidth}>
        <input
          type="text"
          value={link}
          onChange={(e) =>
            setState((state) => ({ ...state, link: e.target.value }))
          }
        />
      </div>
      <Typography variant="caption">
        Inserire il link alla PR o, se assente, al repository dello studente o
        altro file pervenuto
      </Typography>
    </form>
  );
};
