import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/authSlice.js";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <header className="app-header">
      <div className="header-logo">✅ TaskApp</div>
      <nav className="header-nav">
        <span>Dashboard</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
