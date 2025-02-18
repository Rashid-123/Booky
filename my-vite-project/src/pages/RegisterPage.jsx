import { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const { register } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await register(name, email, password);
                  navigate("/");
            } catch (error) {
                  console.error("Registration failed:", error);
            }
      };

      return (
            <Container maxWidth="sm">
                  <Typography variant="h4" gutterBottom>
                        Register
                  </Typography>
                  <form onSubmit={handleSubmit}>
                        <TextField
                              label="Name"
                              fullWidth
                              margin="normal"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                        />
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
                              Register
                        </Button>
                  </form>
            </Container>
      );
};

export default RegisterPage;