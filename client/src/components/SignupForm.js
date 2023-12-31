// styles
import "../styles/Form.css";

// contexts
import { formContext } from "../contexts/FormContext";

// react
import { useState, useContext } from "react";

const SignupForm = () => {
  const { setIsLogin } = useContext(formContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUserName = (e) => {
    setUserName(e.target.value.trim());
  };

  const handlePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value.trim());
  };

  const toggleFormState = () => {
    setIsLogin(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /**
   *
   * When a user signs up, set the current user to the user object returned by the server.
   * For signing up, a post request is made to the server with the user credentials.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    const userData = { userName, password };

    const res = await fetch(`http://localhost:8000/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) {
      setErr(data.message);
      return;
    }

    // register and go back to the user login page
    setIsLogin(true);
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

        <div className="input-con">
          <input
            className="form-input"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={handleConfirmPassword}
            value={confirmPassword}
          />

          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className={`material-symbols-outlined toggle-vis-btn`}
            title={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "visibility_off" : "visibility"}
          </button>
        </div>

        <button type="submit" className="form-submit-btn">
          Signup
        </button>
      </form>
      <div className="form-change">
        <p>Already have an account? </p>
        <button className="form-change-btn" onClick={toggleFormState}>
          Login
        </button>
      </div>
    </>
  );
};

export default SignupForm;
