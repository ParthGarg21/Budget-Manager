// styles
import "../styles/Form.css";

// contexts
import { formContext } from "../contexts/FormContext";
import { userContext } from "../contexts/UserContext";

// react
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverOrigin from "../utils/getOrigin";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setIsLogin } = useContext(formContext);
  const { setUser } = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggelFormState = () => {
    setIsLogin(false);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value.trim());
  };

  const handlePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  /**
   * When a user logs in, set the current user to the user object returned by the server.
   * For logging in, a post request is made to the server with the user credentials.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "" || userName === "") {
      setErr("Please fill all the fields");
      return;
    }

    const userData = { userName, password };

    const res = await fetch(`http://localhost:8000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const { message, data } = await res.json();

    // if the user credentials are wrong then show the error message
    if (!res.ok) {
      setErr(message);
      return;
    }

    // set the user and navigate to the dashboard
    setUser(data.user);
    navigate("/dashboard");
  };

  return (
    <>
      <span className="error">{err}</span>
      <form className="login-form user-form" onSubmit={handleSubmit}>
        <div className="input-con">
          <input
            className="form-input"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleUserName}
            value={userName}
          />
        </div>

        <div className="input-con">
          <input
            className="form-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handlePassword}
            value={password}
          />

          <button
            type="button"
            onClick={toggleShowPassword}
            className={`material-symbols-outlined toggle-vis-btn`}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </button>
        </div>

        <button type="submit" className="form-submit-btn">
          Login
        </button>
      </form>
      <div className="form-change">
        <p>Don't have an account yet? </p>
        <button className="form-change-btn" onClick={toggelFormState}>
          Signup
        </button>
      </div>
    </>
  );
};

export default LoginForm;
