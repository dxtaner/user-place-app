import React, { useState, useEffect } from "react";
import PlaceForm from "./PlaceForm";
import PlaceList from "./PlaceList";
import { useNavigate } from "react-router-dom";

const Place = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    image: null,
  });
  const [places, setPlaces] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { title, description, address, image } = formData;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const fetchPlaces = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/places/places");
      const data = await response.json();
      if (data.success) {
        setPlaces(data.places);
      } else {
        setErrorMessage("Failed to fetch places.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch places.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("address", address);
    if (image) form.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/places/places", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred.");
      }

      setSuccessMessage("Place created successfully!");
      setErrorMessage("");
      fetchPlaces();
    } catch (error) {
      setErrorMessage(error.message || "Failed to create place.");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    fetchPlaces();
  }, []);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "3rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #f5a623, #f4c542)",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        maxWidth: "1200px",
        margin: "4rem auto",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          fontWeight: "bold",
          color: "#2d3436",
        }}
      >
        Manage Places
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          lineHeight: "1.8",
          marginBottom: "3rem",
          color: "#636e72",
        }}
      >
        Add amazing places to share with others. Create, view, and manage places
        below.
      </p>

      {errorMessage && (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            marginBottom: "1rem",
            fontSize: "1.1rem",
          }}
        >
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div
          style={{
            color: "green",
            fontWeight: "bold",
            marginBottom: "1rem",
            fontSize: "1.1rem",
          }}
        >
          {successMessage}
        </div>
      )}

      {!isAuthenticated && (
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={handleLoginRedirect}
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#2d3436",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1a252b")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2d3436")}
          >
            Login to Manage Places
          </button>
        </div>
      )}

      {isAuthenticated && (
        <>
          <PlaceForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          />

        </>
      )}
      <PlaceList places={places} />
    </div>
  );
};

export default Place;
