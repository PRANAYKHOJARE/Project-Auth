import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
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
