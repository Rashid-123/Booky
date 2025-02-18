import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "./navbar";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
      const { user, logout } = useContext(AuthContext); // Access AuthContext

      return (
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                  {/* Navbar (with AuthContext) */}
                  <header>
                        <Navbar user={user} logout={logout} /> {/* Pass user & logout to Navbar */}
                  </header>

                  {/* Main content area */}
                  <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
                        <Outlet /> {/* Renders the current route's component */}
                  </Container>

                  {/* Footer */}
                  <footer>
                        <Footer />
                  </footer>
            </Box>
      );
};

export default Layout;
