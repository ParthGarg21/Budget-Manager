import homeImage from "../images/home-image.jpg";
import "../styles/Home.css";
import LoginForm from "./LoginForm";

import { formContext } from "../contexts/FormContext";
import { useContext, useState } from "react";
import SignupForm from "./SignupForm";
import useCheckIsLogin from "../custom hooks/useCheckIsLogin";
import { BarLoader } from "react-spinners";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { isLogin } = useContext(formContext);
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
          {loading ? (
            <>
              <h1>Loading...</h1>
              <p>
              <BarLoader color="black" width={150} />
              </p>
            </>
          ) : isLogin ? (
            <LoginForm />
          ) : (
            <SignupForm />
          )}
        </div>
      </div>
      <div className="home-image-con">
        <img src={homeImage} alt="home-banner" className="home-image" />
      </div>
    </main>
  );
};

export default Home;
