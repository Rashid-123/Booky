

import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
      const { user, logout } = useContext(AuthContext);
      const [mobileOpen, setMobileOpen] = useState(false);

      const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
      };


      const navLinks = [
            { title: "Books", path: "/books" },
            user?.role === "admin" && { title: "Admin Dashboard", path: "/admin-dashboard" },
            user
                  ? { title: "Profile", path: "/profile", icon: <Avatar sx={{ width: 30, height: 30, bgcolor: "white", color: "#1976d2" }}>{user.name[0]}</Avatar> }
                  : { title: "Login", path: "/login" }
      ].filter(Boolean);

      return (
            <AppBar position="static">
                  <Toolbar>

                        <Typography
                              variant="h6"
                              component={Link}
                              to="/"
                              sx={{ flexGrow: 1, fontWeight: "bold", textDecoration: "none", color: "inherit" }}
                        >
                              Booky
                        </Typography>


                        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
                              {navLinks.map(({ title, path, icon }) => (
                                    <Button key={title} color="inherit" component={Link} to={path} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                          {icon} <Typography variant="body1">{title}</Typography>
                                    </Button>
                              ))}
                              {user && (
                                    <Button color="inherit" onClick={logout} sx={{ textTransform: "none", fontWeight: "bold" }}>
                                          Logout
                                    </Button>
                              )}
                        </Box>


                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { xs: "flex", md: "none" } }}>
                              <MenuIcon />
                        </IconButton>
                  </Toolbar>


                  <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
                              <List>
                                    {navLinks.map(({ title, path }) => (
                                          <ListItem button key={title} component={Link} to={path}>
                                                <ListItemText primary={title} />
                                          </ListItem>
                                    ))}
                                    {user && (
                                          <>
                                                <Divider />
                                                <ListItem button onClick={logout}>
                                                      <ListItemText primary="Logout" />
                                                </ListItem>
                                          </>
                                    )}
                              </List>
                        </Box>
                  </Drawer>
            </AppBar>
      );
};

export default Navbar;
