import { useState, useContext } from "react";
import "../styles/Form.css";
import { formContext } from "../contexts/FormContext";

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    const userData = { userName, password };

    const res = await fetch("http://localhost:8000/users/register", {
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

    setPassword("");
    setUserName("");
    setConfirmPassword("");
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
        <button
          className="form-change-btn"
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default SignupForm;
