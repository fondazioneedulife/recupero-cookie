import { Outlet } from "react-router";
import { EvaluationList } from "../components/EvaluationList";

export const List: React.FC = () => {
  return (
    <>
      <EvaluationList />
      <Outlet />
    </>
  );
};
