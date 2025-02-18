import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookListing from "./pages/BookListing";
import BookDetailsPage from "./pages/BookDetailsPage";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Use Layout for all pages so Navbar & Footer are always present */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="books" element={<BookListing />} />
            <Route path="books/:id" element={<BookDetailsPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin-dashboard" element={<AdminPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
