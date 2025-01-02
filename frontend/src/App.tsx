import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { EvaluationsProvider } from "./components/EvaluationsContext";
import { config } from "./config";
import { Add } from "./routes/Add";
import { Edit } from "./routes/Edit";
import { List } from "./routes/List";

function App() {
  return (
    <EvaluationsProvider>
      <BrowserRouter basename={config.APP_BASENAME}>
        <Routes>
          <Route path="/" element={<List />}>
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EvaluationsProvider>
  );
}

export default App;
