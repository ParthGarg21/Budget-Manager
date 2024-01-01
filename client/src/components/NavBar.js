// styles
import "../styles/Navbar.css";

// images
import logo from "../images/logomark.svg";

// contexts
import { userContext } from "../contexts/UserContext";

// react
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverOrigin from "../utils/getOrigin";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  /**
   * logout the user by making a get request to the server
   */

  const handleLogOut = async () => {
    const res = await fetch(`https://budget-app-server-1s1n.onrender.com/users/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      // remove the token from local storage and set user context to null
      localStorage.removeItem("token");
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
        <div className="nav-links">
          <Link to="/dashboard">
            <button className="dashboard-btn">Dashboard</button>
          </Link>

          <button className="logout-btn" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
