import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoSection from "../components/TodoSection";

function DashBoardPage() {
  return (
    <div className="dashboard-layout">
      <Header />

      <main className="dashboard-main">
        <TodoSection />
      </main>

      <Footer />
    </div>
  );
}

export default DashBoardPage;
