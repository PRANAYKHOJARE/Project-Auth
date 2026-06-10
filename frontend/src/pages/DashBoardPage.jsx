import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoSection from "../components/TodoSection";
import { useSelector } from "react-redux";

function DashBoardPage() {
  // Pull the logged-in user details directly from your auth state
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-layout">
      {/* Example: Pass user data to Header to show their profile image/name */}
      <Header user={user} />

      <main className="dashboard-main">
        {/* Pass the userId and role down so the component knows whose items to fetch */}
        <TodoSection userId={user?.id} role={user?.role} />
      </main>

      <Footer />
    </div>
  );
}

export default DashBoardPage;