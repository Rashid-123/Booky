import { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const { login } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await login(email, password);
                  navigate("/");
            } catch (error) {
                  console.error("Login failed:", error);
            }
      };

      return (
            <Container maxWidth="sm">
                  <Typography variant="h4" gutterBottom>
                        Login
                  </Typography>
                  <form onSubmit={handleSubmit}>
                        <TextField
                              label="Email"
                              fullWidth
                              margin="normal"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                              label="Password"
                              type="password"
                              fullWidth
                              margin="normal"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary">
                              Login
                        </Button>
                  </form>
            </Container>
      );
};

export default LoginPage;