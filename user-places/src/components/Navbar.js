import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav
      style={{
        backgroundColor: "#333",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>My User Place Website</div>

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            margin: "0 1rem",
            fontSize: "1.1rem",
          }}
        >
          Home
        </Link>
        <Link
          to="/place"
          style={{
            color: "white",
            textDecoration: "none",
            margin: "0 1rem",
            fontSize: "1.1rem",
          }}
        >
          Place
        </Link>



        {loggedIn ? (
          <>
            <Link
              to="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 1rem",
                fontSize: "1.1rem",
              }}
            >
              Dashboard
            </Link>


            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ff6a00",
                color: "white",
                border: "none",
                padding: "0.8rem 1.5rem",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 1rem",
                fontSize: "1.1rem",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 1rem",
                fontSize: "1.1rem",
              }}
            >
              Register
            </Link>
          </>
        )}
        <Link
          to="/about"
          style={{
            color: "white",
            textDecoration: "none",
            margin: "0 1rem",
            fontSize: "1.1rem",
          }}
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
