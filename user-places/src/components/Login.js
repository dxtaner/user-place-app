import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const isLoggedIn = localStorage.getItem("token");

  if (isLoggedIn) {
    setTimeout(() => navigate("/dashboard"), 1000);
    toast.info("🔄 You are already logged in! Redirecting...", { autoClose: 3000 });
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error("❌ " + (data.message || "Invalid email or password."), { autoClose: 3000 });
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
        toast.success("✅ Login successful! Redirecting...", { autoClose: 2000 });
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      toast.error("⚠️ Failed to login. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <div style={{ padding: "3rem", textAlign: "center", background: "linear-gradient(135deg, #84fab0, #8fd3f4)", color: "#333", borderRadius: "20px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", maxWidth: "800px", margin: "3rem auto" }}>
      <ToastContainer />
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "bold" }}>Login to Your Account</h1>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "2rem" }}>
        Don't have an account? <Link to="/register" style={{ color: "#4e54c8" }}>Register here.</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input type="email" name="email" value={email} onChange={handleInputChange} placeholder="Email Address" style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", border: "1px solid #ccc" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Password" style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", border: "1px solid #ccc" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "1rem", background: "linear-gradient(45deg, #ff6a00, #ff8e00)", color: "white", borderRadius: "10px", border: "none", fontWeight: "bold", transition: "all 0.3s ease" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
