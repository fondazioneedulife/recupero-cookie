# Software per la valutazione degli esami

## Scopo

Il software permette di valutare gli esami in modo obiettivo e di registrare le valutazioni di ciascuno studente. Permette inoltre di calcolare il voto complessivo di ogni studente e la media dei voti della classe.

### Criteri di valutazione

La valutazione complessiva consiste nella somma di parametri oggettivi connessi ai task richiesti, più una valutazione numerica a discrezione del docente, che potrà alzare o abbassare la votazione in base alla qualità del codice scritto. La valutazione è espressa in valori numerici interi da 0 a 10.

Valutazione dei singoli task:

- fork del repository, commit e invio della PR: 1pt
- svolgimento del primo task - frontend: 2pt
- svolgimento del primo task - backend: 2pt
- svolgimento del secondo task - frontend: 2pt
- svolgimento del secondo task - backend: 2pt

Il totale dei punti assegnati con questo criterio è 9, un ulteriore punto può essere aggiunto dal docente utilizzando l'apposito campo di valutazione soggettiva.

## Struttura dei dati

Il database è costituito da un'unica collection di documenti. Ciascun documento rappresenta la valutazione di uno studente, ogni documento è strutturato come segue:

```js
{
  nome: string,
  task_svolti_correttamente: {
    fork_commit_pr: boolean,
    task_1_frontend: boolean,
    task_1_backend: boolean,
    task_2_frontend: boolean,
    task_2_backend: boolean,
  },
  valutazione: number,
  note: string,
  link: string // memorizza il link alla PR o, se assente, al repository dello studente o altro file pervenuto
}
```
