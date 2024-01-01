// components
import ProgressBar from "@ramonak/react-progress-bar";

// react
import { Link, useNavigate } from "react-router-dom";

import serverOrigin from "../utils/getOrigin";

// render budget card
const BudgetCard = ({ budget, color, isDetail }) => {
  const completed = Math.trunc(
    (budget.totalExpense / budget.budgetAmount) * 100
  );

  const navigate = useNavigate();

  // delete budget from the database and redirect to dashboard
  const handleDelete = async () => {
    const id = budget._id;
    const res = await fetch(`http://localhost:8000/budgets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });

    if (!res.ok) {
      return;
    }

    /**
     * no need to manually change the states as the redirection will cause
     * the dashboard to re-render, which will make calls to the baclend, thus
     * updating the states
     */

    navigate("/dashboard");
  };

  return (
    <article className="budget-card-con">
      <div className="budget-card" style={{ color }}>
        <div className="details">
          <h2 className="budget-name">{budget.name}</h2>
          <p className="budget-amount">Rs.{budget.budgetAmount}</p>
        </div>
        <div className="details-con">
          <ProgressBar
            completed={completed}
            maxCompleted={100}
            // isLabelVisible={false}
            baseBgColor="#D3DEDE"
            bgColor={color}
          />
          <div className="details-page">
            <span>Rs.{budget.totalExpense} spent</span>
            <span>
              Rs.{budget.budgetAmount - budget.totalExpense} remaining
            </span>
          </div>
        </div>

        <div className="details-btn-con">
          {!isDetail ? (
            /**
             * if the budget card is not in the details page then show the view details button
             * which will redirect to the details page
             */
            <Link to={`/${budget._id}`}>
              <button
                className="details-btn"
                style={{ backgroundColor: color }}
              >
                View Details
              </button>
            </Link>
          ) : (
            /**
             * else show the delete budget button
             * which will delete the budget from the database
             * and redirect to the dashboard
             */
            <button className="details-btn delete-btn" onClick={handleDelete}>
              Delete Budget
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BudgetCard;
