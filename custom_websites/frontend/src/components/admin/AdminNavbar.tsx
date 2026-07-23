import { Link } from "react-router-dom";
import "../../styles/AdminNavbar.css";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
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
    </nav>
  );
}

export default AdminNavbar;