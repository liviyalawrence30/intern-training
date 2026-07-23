import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      email === "admin@customwebsites.com" &&
      password === "admin123"
    ) {
      toast.success("Login Successful!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <section className="admin-login">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default AdminLogin;