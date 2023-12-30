// import { ProgressBar } from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";

const BudgetCard = ({ budget, color }) => {
  const completed = Math.trunc(
    (budget.totalExpense / budget.budgetAmount) * 100
  );
  return (
    <article className="budget-card" style={{ color }}>
      <div className="details">
        <h2 className="budget-name">{budget.name}</h2>
        <p className="budget-amount">Rs.{budget.budgetAmount}</p>
      </div>
      <div className="details-con">
        <ProgressBar
          completed={completed}
          maxCompleted={100}
          isLabelVisible={false}
          baseBgColor="#D3DEDE"
          bgColor={color}
        />
        <div className="details-page">
          <span>Rs.{budget.totalExpense} spent</span>
          <span>Rs.{budget.budgetAmount - budget.totalExpense} remaining</span>
        </div>
      </div>
      <div className="details-btn-con">
        <button className="details-btn" style={{ backgroundColor: color }}>
          View Details
        </button>
      </div>
    </article>
  );
};

export default BudgetCard;
