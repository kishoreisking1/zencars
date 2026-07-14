import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Check if admin
      const isAdmin = res.data.email === "kishore@gmail.com";

      // Save data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", isAdmin ? "admin" : "user");

      // Update Context
      login(
        {
          name: res.data.name,
          email: res.data.email,
          role: isAdmin ? "admin" : "user",
        },
        res.data.token
      );

      alert("Login Successful");

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </section>
  );
}

export default Login;