import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
      const { user, logout } = useContext(AuthContext);

      return (
            <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 3 }}>
                  <Toolbar sx={{ maxWidth: "1480px", margin: "0 auto", width: "100%" }}>
                        {/* Logo or Brand Name */}
                        <Typography
                              variant="h6"
                              component={Link}
                              to="/"
                              sx={{
                                    flexGrow: 1,
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                    color: "inherit",
                              }}
                        >
                              Book Store
                        </Typography>

                        {/* Navigation Links */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              {/* Always Show Books Button */}
                              <Button
                                    color="inherit"
                                    component={Link}
                                    to="/books"
                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                              >
                                    Books
                              </Button>

                              {user ? (
                                    <>
                                          {/* Admin Dashboard Button (Only for Admins) */}
                                          {user.role === "admin" && (
                                                <Button
                                                      color="inherit"
                                                      component={Link}
                                                      to="/admin-dashboard"
                                                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                      Admin Dashboard
                                                </Button>
                                          )}

                                          {/* Profile Button with Avatar */}
                                          <Button
                                                color="inherit"
                                                component={Link}
                                                to="/profile"
                                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                          >
                                                <Avatar sx={{ width: 30, height: 30, bgcolor: "white", color: "#1976d2" }}>
                                                      {user.name[0]}
                                                </Avatar>
                                                <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                                                      {user.name}
                                                </Typography>
                                          </Button>

                                          {/* Logout Button */}
                                          <Button
                                                color="inherit"
                                                onClick={logout}
                                                sx={{ textTransform: "none", fontWeight: "bold" }}
                                          >
                                                Logout
                                          </Button>
                                    </>
                              ) : (
                                    // Login Button
                                    <Button
                                          color="inherit"
                                          component={Link}
                                          to="/login"
                                          sx={{ textTransform: "none", fontWeight: "bold" }}
                                    >
                                          Login
                                    </Button>
                              )}
                        </Box>
                  </Toolbar>
            </AppBar>
      );
};

export default Navbar;
