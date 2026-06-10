import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoSection from "../components/TodoSection";
import { useSelector } from "react-redux";

function DashBoardPage() {
  // Pull the logged-in user details directly from your auth state
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-layout min-h-screen flex flex-col bg-slate-900 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,#0f172a_100%)] text-slate-50 antialiased selection:bg-indigo-500/30">
      {/* Example: Pass user data to Header to show their profile image/name */}
      <Header user={user} />

      <main className="dashboard-main flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Pass the userId and role down so the component knows whose items to fetch */}
        <TodoSection userId={user?.id} role={user?.role} />
      </main>

      <Footer />
    </div>
  );
}

export default DashBoardPage;