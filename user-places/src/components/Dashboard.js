import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [view, setView] = useState("me");
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Unauthorized access. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      data.success ? setUser(data.user) : setError(data.message);
    } catch {
      setError("Failed to fetch user data.");
    }
  }, [navigate]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      data.success ? setAllUsers(data.users) : setError(data.message);
    } catch {
      setError("Failed to fetch all users.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogoutMessage("Successfully logged out. Redirecting...");
    setTimeout(() => navigate("/login"), 2000);
  };

  useEffect(() => {
    fetchUserData();
    fetchAllUsers();
  }, [fetchUserData]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Welcome to Your Dashboard</h1>

      {error && <div style={styles.error}>{error}</div>}
      {logoutMessage && <div style={styles.success}>{logoutMessage}</div>}

      <div style={styles.switchContainer}>
        <button
          style={view === "me" ? styles.activeButton : styles.button}
          onClick={() => setView("me")}
        >
          My Profile
        </button>
        <button
          style={view === "all" ? styles.activeButton : styles.button}
          onClick={() => setView("all")}
        >
          All Users
        </button>
      </div>

      {view === "me" && (
        <div style={styles.profileCard}>
          <h2 style={styles.sectionTitle}>👤 My Profile</h2>
          {user ? (
            <div style={styles.profileDetails}>
              {user.image && (
                <img
                  src={`http://localhost:5000/${user.image}`}
                  alt="Profile"
                  style={styles.profileImage}
                />
              )}
              <div style={styles.infoContainer}>
                <p><span style={styles.label}>Name:</span> {user.name}</p>
                <p><span style={styles.label}>Email:</span> {user.email}</p>

                <div style={styles.placesContainer}>
                  <h3 style={styles.label}>Places:</h3>
                  {user.places.length > 0 ? (
                    user.places.map((place) => (
                      <div key={place._id} style={styles.placeCard}>
                        {place.image && (
                          <img
                            src={`http://localhost:5000/${place.image}`}
                            alt={place.title}
                            style={styles.placeImage}
                          />
                        )}
                        <p><strong>Title:</strong> {place.title}</p>
                        <p><strong>Address:</strong> {place.address}</p>
                        <p><strong>Description:</strong> {place.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No places added.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      )}

      {view === "all" && (
        <div style={styles.userList}>
          <h2 style={styles.sectionTitle}>🌐 All Users</h2>
          {allUsers.length > 0 ? (
            allUsers.map((u) => (
              <div key={u._id} style={styles.userCard}>
                {u.image && (
                  <img
                    src={`http://localhost:5000/${u.image}`}
                    alt={u.name}
                    style={styles.userImage}
                  />
                )}
                <p><strong>Name:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>

                <div style={styles.placesContainer}>
                  <h3 style={styles.label}>Places:</h3>
                  {u.places.length > 0 ? (
                    u.places.map((place) => (
                      <div key={place._id} style={styles.placeCard}>
                        {place.image && (
                          <img
                            src={`http://localhost:5000/${place.image}`}
                            alt={place.title}
                            style={styles.placeImage}
                          />
                        )}
                        <p><strong>Title:</strong> {place.title}</p>
                        <p><strong>Address:</strong> {place.address}</p>
                        <p><strong>Description:</strong> {place.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No places added.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </div>
      )}

      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "4rem",
    textAlign: "center",
    background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
    color: "#fff",
    borderRadius: "25px",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.2)",
    maxWidth: "1200px",
    margin: "4rem auto",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "3rem",
  },
  error: { color: "#ff4d4d", margin: "1rem 0" },
  success: { color: "#32CD32", margin: "1rem 0" },
  switchContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginBottom: "2.5rem",
  },
  button: {
    padding: "1rem 3rem",
    fontSize: "1.5rem",
    borderRadius: "50px",
    backgroundColor: "#6a11cb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  activeButton: {
    padding: "1rem 3rem",
    fontSize: "1.5rem",
    borderRadius: "50px",
    backgroundColor: "#32CD32",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "25px",
    padding: "3rem",
    color: "#333",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#4e54c8",
  },
  profileDetails: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  profileImage: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
  },
  infoContainer: {
    textAlign: "left",
    lineHeight: "2",
    fontSize: "1.6rem",
  },
  label: {
    fontWeight: "700",
    color: "#6a11cb",
  },
  placesContainer: {
    marginTop: "2rem",
    textAlign: "left",
  },
  placeCard: {
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1rem",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  placeImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  userList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
  },
  userCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "2rem",
    color: "#333",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    flex: "1 1 calc(30% - 2rem)",
  },
  userImage: {
    width: "120px",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  logoutButton: {
    padding: "1.2rem 4rem",
    fontSize: "1.6rem",
    backgroundColor: "#ff4d4d",
    borderRadius: "50px",
    cursor: "pointer",
    marginTop: "3rem",
  },
};

export default Dashboard;
