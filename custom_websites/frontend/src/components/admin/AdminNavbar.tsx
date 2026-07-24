import { Link } from "react-router-dom";
import "../../styles/AdminNavbar.css";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";


function AdminNavbar() {

  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

const toggleTheme = () => {
  setDarkMode((prev) => !prev);
};
  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        <h2>Custom Websites</h2>
      </div>

      <div className="admin-links">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/requests">Website Requests</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/slots">Slots</NavLink>
        <NavLink to="/admin/slots?status=booked">Booked Slots</NavLink>
        <Link to="/admin">Logout</Link>
      </div>
      <div className="admin-actions">
  <button
    className="theme-btn"
    onClick={toggleTheme}
    aria-label="Toggle Theme"
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>
</div>
    </nav>
  );
}

export default AdminNavbar;