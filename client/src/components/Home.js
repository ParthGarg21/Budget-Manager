// styles
import "../styles/Home.css";

// images
import homeImage from "../images/home-image.jpg";

// components
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

// contexts
import { formContext } from "../contexts/FormContext";

// react
import { useContext, useState } from "react";

// custom hooks
import useCheckIsLogin from "../custom hooks/useCheckIsLogin";
import LoadingCon from "./LoadingCon";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { isLogin } = useContext(formContext);

  /**
   * check if the user is already logged in
   * if logged in then set the states and redirect to dashboard
   * else show the login and signup form
   */
  useCheckIsLogin(setLoading, "/dashboard");

  return (
    <main className="home">
      <div className="home-desc-con">
        <h1 className="home-title">
          Welcome to <span className="home-highlight">Budget Manager</span>
        </h1>
        <p className="home-desc">
          Here you take control of your{" "}
          <span className="home-highlight">money</span>
          <br />
          Keep a track of your budgets and expenses!
        </p>

        <div className="form-con">
          {loading ? <LoadingCon /> : isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
      <div className="home-image-con">
        <img src={homeImage} alt="home-banner" className="home-image" />
      </div>
    </main>
  );
};

export default Home;
