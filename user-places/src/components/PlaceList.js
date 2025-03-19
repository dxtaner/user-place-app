import React from "react";
import { useNavigate } from "react-router-dom";

const PlaceList = ({ places }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/places/${id}`);
  };

  return (
    <div style={{ marginTop: "3rem", padding: "0 1rem" }}>
      <h2
        style={{
          fontSize: "2.5rem",
          color: "#2C3E50",
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Explore Amazing Places
      </h2>
      {places.length === 0 ? (
        <p style={{ fontSize: "1.4rem", color: "#7f8c8d", textAlign: "center" }}>
          Sorry, there are no places available at the moment.
        </p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {places.map((place) => (
            <li
              key={place._id}
              onClick={() => handleClick(place._id)}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                marginBottom: "2rem",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3
                style={{
                  fontSize: "1.9rem",
                  color: "#34495E",
                  fontWeight: "bold",
                  marginBottom: "1.2rem",
                  textAlign: "center",
                }}
              >
                {place.title}
              </h3>
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "#7f8c8d",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {place.description}
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#7f8c8d",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                <strong>Address:</strong> {place.address}
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#7f8c8d",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                <strong>Location:</strong> Lat: {place.location.lat}, Lng:{" "}
                {place.location.lng}
              </p>
              {place.image && (
                <img
                  src={`http://localhost:5000/${place.image}`}
                  alt={place.title}
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    margin: "1.5rem auto",
                    display: "block",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceList;
