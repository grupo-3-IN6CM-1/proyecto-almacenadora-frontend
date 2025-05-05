import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useUserDetails } from "../../shared/hooks";
import '../../components/navbars/navbar.css';

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, isLogged } = useUserDetails();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout(); 
    navigate("/auth"); 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-light">
                  <FaBell />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-light">
                  <FaUserCircle />
                </button>
              </li>
              {isLogged && (
                <li className="nav-item">
                  <button className="btn btn-light" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <ul className="sidebar-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {isLogged && (
            <li>
              <button className="btn btn-light" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
