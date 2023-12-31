import { useContext, useEffect } from "react";
import { userContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import fetchBudgets from "../utils/fetchBudgets";
import fetchExpenses from "../utils/fetchExpenses";

// hook which checks if user is logged in or not by making a get request to server
// also, fetch all the expnese and budgets of the user

const useCheckIsLogin = async (setLoading, route) => {
  const navigate = useNavigate();
  //   const { setUser, setTotalIcome,  } = useContext(userContext);
  const { setUser, setExpenses, setBudgets } = useContext(userContext);

  const checkIsLogin = async () => {
    const res = await fetch("http://localhost:8000/users/current-user", {
      method: "GET",
      credentials: "include",
    });

    const { data } = await res.json();

    if (res.ok) {
      // get all the expenses and budgets of the user
      // use promise.all to get the results
      const [expenses, budgets] = await Promise.all([
        fetchExpenses(),
        fetchBudgets(),
      ]);

      // if user is logged in then set user context and other details and navigate to dashboard
      setUser(data.user);
      setExpenses(expenses);
      setBudgets(budgets);

      console.log("user", data.user);
      console.log("expenses", expenses);
      console.log("budgets", budgets);

      if (route === "/dashboard") {
        navigate(route);
      }
    } else {
      // if user is not logged in then set user context to null and navigate to home page
      setUser(null);

      if (route === "/") {
        navigate(route);
      }
    }

    // set loading to false after getting response from server
    setLoading(false);
  };

  useEffect(() => {
    checkIsLogin();
  }, []);
};

export default useCheckIsLogin;
