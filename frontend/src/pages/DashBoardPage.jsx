import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoSection from "../components/TodoSection";
import { useSelector } from "react-redux";

function DashBoardPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header user={user} />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <TodoSection userId={user?.id} role={user?.role} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DashBoardPage;