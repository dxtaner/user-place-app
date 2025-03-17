import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, image } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", name);
    formDataObj.append("email", email);
    formDataObj.append("password", password);
    formDataObj.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Something went wrong!");
      } else {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
        color: "#333",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "4rem auto",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontWeight: "600",
          color: "#2d3436",
        }}
      >
        Create Your Account
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.8",
          marginBottom: "2rem",
          color: "#636e72",
        }}
      >
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#4e54c8", fontWeight: "500" }}>
          Login here.
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Full Name"
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              transition: "0.3s",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email Address"
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              transition: "0.3s",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              transition: "0.3s",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              transition: "0.3s",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "1rem",
            background: "linear-gradient(45deg, #ff6a00, #ff8e00)",
            color: "#fff",
            borderRadius: "12px",
            border: "none",
            fontWeight: "600",
            fontSize: "1.2rem",
            transition: "0.3s",
          }}
        >
          Register
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
