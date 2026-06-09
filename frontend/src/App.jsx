import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashBoardPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;