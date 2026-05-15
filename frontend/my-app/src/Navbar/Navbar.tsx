import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") as string);
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <Link to="/galleries" className="nav-brand">
        <div className="nav-logo">
          Photo <span>Gallery</span>
        </div>
      </Link>

      <div className="nav-links">
        {user ? (
          <div className="user-section">
            <span className="user-email">
              {user?.user?.email}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              Login
            </Link>

            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};