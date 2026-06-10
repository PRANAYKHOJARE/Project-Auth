import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // Safe fallback check for token existence
  const hasToken = !!localStorage.getItem("token");
  const hasUser = localStorage.getItem("user") !== null && localStorage.getItem("user") !== "undefined";

  // Double-verify authentication credentials
  const isAuth = isAuthenticated || (hasToken && hasUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!isAuth ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
        />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={isAuth ? <DashBoardPage /> : <Navigate to="/login" replace />} 
        />

        {/* Fallback redirection */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;