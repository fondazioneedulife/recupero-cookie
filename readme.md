# Software per la valutazione degli esami

## Scopo

Il software permette di valutare gli esami in modo obiettivo e di registrare le valutazioni di ciascuno studente. Permette inoltre di calcolare il voto complessivo di ogni studente e la media dei voti della classe.

### Funzionamento del software

La valutazione complessiva consiste nella somma di parametri oggettivi connessi ai task richiesti, più una valutazione numerica a discrezione del docente, che potrà alzare o abbassare la votazione in base alla qualità del codice scritto. La valutazione è espressa in valori numerici interi da 0 a 10.

Valutazione dei singoli task:

- fork del repository, commit e invio della PR: 1pt
- svolgimento del primo task - frontend: 2pt
- svolgimento del primo task - backend: 2pt
- svolgimento del secondo task - frontend: 2pt
- svolgimento del secondo task - backend: 2pt

Il totale dei punti assegnati con questo criterio è 9, ma il punteggio puà essere modificato a piacere dal docente. Il calcolo del punteggio rappresenta quindi solo un suggerimento per il docente.

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

# Svolgimento dell'esame

Una volta [installato e avviato il progetto in locale (clicca per le istruzioni)](./doc/install.md), svolgi i seguenti task.

Quando hai terminato, segui le istruzioni per la consegna (vedi sotto).

### Task da eseguire durante l'esame

- Installa l'applicazione e verifica che parta correttamente
- **Task 1**:
  - frontend: nel file [frontend\src\components\EvaluationsContext.tsx](frontend\src\components\EvaluationsContext.tsx) invoca l'api `/api/average-evaluation` dove indicato
  - backend: nel file [backend\routes\api.ts](backend\routes\api.ts), implementa l'api `/api/average-evaluation` dove indicato
- **Task 2**:
  - frontend: nel file [frontend\src\components\evaluationForm\EvaluationForm.tsx](frontend\src\components\evaluationForm\EvaluationForm.tsx) implementa la chiamata all'api `/api/calculate` e agiorna lo stato del componente
  - backend: nel file [backend\routes\api.ts](backend\routes\api.ts), implementa l'api `/api/calculate` dove indicato
- **Task 3**:
  - backend: nel file [backend\lib\averages.ts](backend\lib\averages.ts), dove indicato, completa la funzione `averageRating` in modo che calcoli la media delle valutazioni

### Istruzioni per la consegna

- committa sul tuo branch tutti gli step, così da poter tornare indietro quando vuoi e non perdere tempo e lavoro durante la prova d'esame
- quando hai finito, esegui git push
- da github, crea una Pull Request
- infine, scarica uno zip della cartella del progetto dal tuo profilo github e consegnalo alla commissione d'esame

La corretta consegna degli elaborati, come descritto in questa guida, verrà valutata con un punto aggiuntivo sulla tua valutazione.

## Valutazione

Il risultato dell'esame terrà in considerazione i seguenti parametri:

- numero di task svolti con successo
- qualità del codice prodotto, valutata alla consegna dagli esaminatori
