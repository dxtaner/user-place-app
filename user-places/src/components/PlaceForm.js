import React from "react";

const PlaceForm = ({ formData, handleInputChange, handleFileChange, handleSubmit }) => {
  const { title, description, address, image } = formData;

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter Place Title"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            background: "#f9f9f9",
          }}
        />
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <textarea
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Enter Description"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            background: "#f9f9f9",
            minHeight: "150px",
          }}
        />
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter Address"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            background: "#f9f9f9",
          }}
        />
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "#f9f9f9",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "1.2rem",
          background: "linear-gradient(45deg, #FF6347, #FF8C00)",
          color: "white",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Create New Place
      </button>
    </form>
  );
};

export default PlaceForm;
