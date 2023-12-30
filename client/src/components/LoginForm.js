import { useState, useContext } from "react";
import "../styles/Form.css";
import { formContext } from "../contexts/FormContext";
import { userContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

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

  const handleUserName = (e) => {
    setUserName(e.target.value.trim());
  };

  const handlePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, password);
    if (password === "" || userName === "") {
      setErr("Please fill all the fields");
      return;
    }
    const userData = { userName, password };

    const res = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const { message, data } = await res.json();
    if (!res.ok) {
      setErr(message);
      return;
    }

    setPassword("");
    setUserName("");
    setErr("");
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
        <button
          className="form-change-btn"
          onClick={() => {
            setIsLogin(false);
          }}
        >
          Signup
        </button>
      </div>
    </>
  );
};

export default LoginForm;
