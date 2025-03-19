import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceDetail = () => {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));

        const fetchPlace = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/places/places/${placeId}`);
                const data = await response.json();

                if (!data.success) {
                    setError("Place not found!");
                    toast.error("🚨 Place not found!", { autoClose: 3000, position: "top-right", theme: "dark" });
                } else {
                    setPlace(data.place);
                    setUpdatedTitle(data.place.title);
                    setUpdatedDescription(data.place.description);
                }
            } catch (err) {
                setError("Error fetching place details.");
                toast.error("❌ Error fetching place details.", { autoClose: 3000, position: "top-right", theme: "dark" });
            }
        };

        fetchPlace();
    }, [placeId]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this place?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/places/places/${placeId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to delete place.");

            toast.success("✅ Place deleted successfully!", { autoClose: 3000, position: "bottom-right", theme: "colored" });
            navigate("/");
        } catch (err) {
            setError("Error deleting place: " + err.message);
            toast.error("❌ Error deleting place: " + err.message, { autoClose: 3000, position: "bottom-right", theme: "colored" });
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/places/places/${placeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update place.");

            setPlace(data.place);
            toast.info("🔄 Place updated successfully!", { autoClose: 3000, position: "top-right", theme: "light" });
            setIsEditing(false);
        } catch (err) {
            setError("Error updating place: " + err.message);
            toast.error("❌ Error updating place: " + err.message, { autoClose: 3000, position: "top-right", theme: "light" });
        }
    };

    if (error) return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;
    if (!place) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    const isPlaceOwner = place.creator._id === userId;

    return (
        <div style={styles.container}>
            <ToastContainer />

            {isEditing ? (
                <div>
                    <h2>Edit Place</h2>
                    <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} style={styles.input} />
                    <textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} style={styles.textarea} />
                    <button onClick={handleUpdate} style={styles.saveButton}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                </div>
            ) : (
                <>
                    <h1 style={styles.title}>{place.title}</h1>
                    <p style={styles.description}>{place.description}</p>
                    <p style={styles.info}><strong>Address:</strong> {place.address}</p>
                    <p style={styles.info}><strong>Location:</strong> Lat: {place.location.lat}, Lng: {place.location.lng}</p>
                    {place.image && <img src={`http://localhost:5000/${place.image}`} alt={place.title} style={styles.image} />}
                    <div style={styles.buttonContainer}>
                        {isPlaceOwner && (
                            <>
                                <button onClick={() => setIsEditing(true)} style={styles.editButton}>Edit</button>
                                <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "3rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #3498db, #8e44ad)",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        maxWidth: "800px",
        margin: "4rem auto",
        color: "white",
    },
    title: { fontSize: "2.5rem", marginBottom: "1rem" },
    description: { fontSize: "1.3rem", marginBottom: "1rem" },
    info: { fontSize: "1.2rem" },
    image: {
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        borderRadius: "10px",
        marginTop: "1rem",
    },
    buttonContainer: { marginTop: "1.5rem" },
    input: { padding: "0.5rem", fontSize: "1.2rem", marginBottom: "1rem" },
    textarea: { padding: "0.5rem", fontSize: "1.2rem", marginBottom: "1rem", width: "100%", height: "100px" },
    saveButton: { padding: "0.7rem 1.5rem", fontSize: "1.2rem", backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "1rem" },
    cancelButton: { padding: "0.7rem 1.5rem", fontSize: "1.2rem", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
    editButton: { padding: "0.7rem 1.5rem", fontSize: "1.2rem", backgroundColor: "#f1c40f", color: "black", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "1rem" },
    deleteButton: { padding: "0.7rem 1.5rem", fontSize: "1.2rem", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default PlaceDetail;
