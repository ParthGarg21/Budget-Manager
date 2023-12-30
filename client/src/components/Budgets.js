import { Fragment, useContext } from "react";
import { userContext } from "../contexts/UserContext";
import generatePrettyColor from "../utils/generatePrettyColor";
import BudgetCard from "./BudgetCard";
import "../styles/Budgets.css";

const Budgets = () => {
  const { budgets } = useContext(userContext);

  return (
    budgets && (
      <section className="budgets-section">
        <h1>All Budgets</h1>
        <div className="budgets-con">
          {budgets.map((budget) => (
            <Fragment key={budget._id}>
              <BudgetCard budget={budget} color={generatePrettyColor()} />
            </Fragment>
          ))}
        </div>
      </section>
    )
  );
};

export default Budgets;
