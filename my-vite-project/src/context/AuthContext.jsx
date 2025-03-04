import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuth = () => {

      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedUser) {

        setUser(JSON.parse(storedUser));
      }

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;


          if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token expired, logging out...");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            return;
          }


        } catch (error) {
          console.error("Invalid token error:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);


  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data))
      console.log(response.data)
      setUser(response.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };


  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };