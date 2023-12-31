// styles
import "../styles/Budgets.css";

// components
import BudgetCard from "./BudgetCard";

// contexts
import { userContext } from "../contexts/UserContext";

// react
import { Fragment, useContext } from "react";

// utils
import generatePrettyColor from "../utils/generatePrettyColor";

// render all the budgets
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
