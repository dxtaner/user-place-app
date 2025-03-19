import React from "react";

const PlaceItem = ({ place }) => {
  return (
    <li
      key={place._id}
      style={{
        backgroundColor: "#ecf0f1",
        padding: "1.5rem",
        marginBottom: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ fontSize: "1.8rem", color: "#34495E", fontWeight: "bold" }}>
        {place.title}
      </h3>
      <p style={{ fontSize: "1.2rem", color: "#34495E" }}>{place.description}</p>
      <p style={{ fontSize: "1.1rem", color: "#7f8c8d" }}>{place.address}</p>
      {place.imageUrl && (
        <img
          src={place.imageUrl}
          alt={place.title}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
            borderRadius: "8px",
          }}
        />
      )}
    </li>
  );
};

export default PlaceItem;
