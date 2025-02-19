import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
      const { user, logout } = useContext(AuthContext);

      return (
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

                  <header>
                        <Navbar user={user} logout={logout} />
                  </header>


                  <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
                        <Outlet />
                  </Container>


                  <footer>
                        <Footer />
                  </footer>
            </Box>
      );
};

export default Layout;
