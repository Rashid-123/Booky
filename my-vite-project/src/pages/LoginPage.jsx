import { useState, useContext } from "react";
import {
      Container, TextField, Button, Typography, IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
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
                              type={showPassword ? "text" : "password"}
                              fullWidth
                              margin="normal"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              InputProps={{
                                    endAdornment: (
                                          <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                          </InputAdornment>
                                    ),
                              }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                              Login
                        </Button>
                  </form>
            </Container>
      );
};

export default LoginPage;
