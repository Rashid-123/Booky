// pages/UserProfile.js
import { useContext, useState } from "react";
import { Card, CardContent, CardHeader, Typography, Button, Avatar, Grid, TextField } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable for base URL
import axios from "axios";
const UserProfile = () => {
      const { user, logout } = useContext(AuthContext);
      const [formData, setFormData] = useState({
            name: user ? user.name : "",
            email: user ? user.email : "",
      });
      const [error, setError] = useState(null);
      const [isEditMode, setIsEditMode] = useState(false);
      const navigate = useNavigate();

      // Handling input changes
      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      // Handle profile update
      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const token = localStorage.getItem("token");
                  const response = await axios.put(
                        `${API_BASE_URL}/users/${user._id}`,
                        { formData },
                        {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        }
                  );

                  if (response.data.success) {
                        setIsEditMode(false);
                  } else {
                        setError(response.data.message);
                  }
            } catch (err) {
                  setError("Failed to update profile");
            }
      };

      // Handle logout
      const handleLogout = () => {
            logout();
            navigate("/login"); // Redirect to login page after logout
      };

      return (
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
                  <Grid item xs={12} sm={8} md={6}>
                        <Card sx={{ padding: 3 }}>
                              <CardHeader
                                    title="User Profile"
                                    subheader={`Welcome, ${user ? user.name : "Guest"}`}
                                    action={
                                          <Button color="secondary" onClick={handleLogout}>
                                                Logout
                                          </Button>
                                    }
                              />
                              <CardContent>
                                    {error && (
                                          <Typography color="error" variant="body2" gutterBottom>
                                                {error}
                                          </Typography>
                                    )}
                                    <Grid container spacing={2} justifyContent="center">
                                          <Grid item>
                                                <Avatar
                                                      sx={{
                                                            width: 100,
                                                            height: 100,
                                                            bgcolor: "primary.main",
                                                            fontSize: "2rem",
                                                      }}
                                                >
                                                      {user.name[0]} {/* Default avatar with initial */}
                                                </Avatar>
                                          </Grid>
                                          <Grid item xs={12}>
                                                <TextField
                                                      label="Name"
                                                      type="text"
                                                      value={formData.name}
                                                      onChange={handleChange}
                                                      name="name"
                                                      fullWidth
                                                      margin="normal"
                                                      variant="outlined"
                                                      disabled={!isEditMode}
                                                />
                                          </Grid>
                                          <Grid item xs={12}>
                                                <TextField
                                                      label="Email"
                                                      type="email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                      name="email"
                                                      fullWidth
                                                      margin="normal"
                                                      variant="outlined"
                                                      disabled
                                                />
                                          </Grid>
                                          {isEditMode && (
                                                <Grid item xs={12}>
                                                      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                                            Update Profile
                                                      </Button>
                                                </Grid>
                                          )}
                                          <Grid item xs={12} sx={{ textAlign: "center" }}>
                                                <Button variant="outlined" onClick={() => setIsEditMode(!isEditMode)}>
                                                      {isEditMode ? "Cancel" : "Edit Profile"}
                                                </Button>
                                          </Grid>
                                    </Grid>
                              </CardContent>
                        </Card>
                  </Grid>
            </Grid>
      );
};

export default UserProfile;
