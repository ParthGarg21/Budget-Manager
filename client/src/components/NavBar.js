import { Link } from "react-router-dom";
import logo from "../images/logomark.svg";
import "../styles/Navbar.css";
import { userContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const handleLogOut = async () => {
    const res = await fetch("http://localhost:8000/users/logout", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-home-con">
        <img src={logo} alt="logo" className="logo-icon" />
        <h1 className="logo-title">Budget Manager</h1>
      </Link>

      {user && (
        <button className="logout-btn" onClick={handleLogOut}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
