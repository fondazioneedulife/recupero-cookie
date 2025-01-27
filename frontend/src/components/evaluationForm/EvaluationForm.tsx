import { Slider, Typography } from "@mui/material";
import { Mark } from "@mui/material/Slider/useSlider.types";
import React, { useContext, useEffect, useState } from "react";
import { Evaluation } from "../../../../api";
import { evaluateBadgeColor } from "../../lib/evaluateColor";
import { EvaluationFormContext, TEvaluationContext } from "./EvaluationContext";
import styles from "./EvaluationForm.module.css";

export type TaskEvaluations = Record<keyof Tasks, number>;

export const EvaluationForm: React.FC = () => {
  const { state, setState, setTask, note, link, onSave } = useContext(
    EvaluationFormContext,
  ) as TEvaluationContext;

  // Stato locale per il voto suggerito
  const [suggestedVote, setSuggestedVote] = useState(0);

  // In questo esempio, la slider usa il valore dello state globale "valutazione"
  // Il voto suggerito è solo un riferimento, evidenziato nel label dei mark
  const sliderMarks: Mark[] = [
    { value: suggestedVote, label: `Voto suggerito: ${suggestedVote}` },
  ];

  useEffect(() => {
    // Invoca l'API /api/calculate per ottenere il voto suggerito
    // in base ai task svolti (state.task_svolti_correttamente)
    const calculateSuggestedVote = async () => {
      try {
        const response = await fetch(`http://localhost:27017/api/calculate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tasks: state.task_svolti_correttamente,
          }),
        });

        if (!response.ok) {
          throw new Error("Errore durante la chiamata a /api/calculate");
        }

        // Supponiamo che la risposta sia un oggetto con "suggestedVote"
        const data = await response.json();
        setSuggestedVote(data.suggestedVote); // Imposta il voto suggerito
      } catch (error) {
        console.error("Errore nel calcolo del voto suggerito:", error);
        // In caso di errore, puoi usare un valore predefinito
        setSuggestedVote(0);
      }
    };

    calculateSuggestedVote();
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
          setState((current) => ({ ...current, nome: e.target.value }))
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
        marks
        valueLabelDisplay="auto"
        // la "valutazione" effettiva usata dallo studente/docente
        value={state.valutazione}
        // inseriamo un mark che mostra il voto suggerito
        marks={sliderMarks}
        onChange={(e) => {
          setState((current) => ({
            ...current,
            valutazione: Number(e.target.value),
          }));
        }}
      />
      <div className={styles.note}>
        La valutazione può essere modificata a piacere dal docente, il voto
        calcolato sulla base dei task svolti è solo un suggerimento
      </div>

      <h2>Note del docente</h2>
      <div className={styles.fullWidth}>
        <textarea
          value={note}
          onChange={(e) =>
            setState((current) => ({ ...current, note: e.target.value }))
          }
        ></textarea>
      </div>

      <h2>Link</h2>
      <div className={styles.fullWidth}>
        <input
          type="text"
          value={link}
          onChange={(e) =>
            setState((current) => ({ ...current, link: e.target.value }))
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