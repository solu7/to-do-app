import { UserProvider } from "./context/UserContext.jsx";
import { Routes, Route } from "react-router-dom";
import SessionExpiryModal from "./core/components/SessionExpiryModal/SessionExpiryModal.jsx";
import { useUser } from "./context/UserContext.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import AboutMePage from "./pages/AboutMe/AboutMe.jsx";
import AboutProjectPage from "./pages/AboutProject/AboutProject.jsx";
import RegisterPage from "./features/auth/Register/Register.jsx";
import LoginPage from "./features/auth/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function AppContent() {
  const { isExpiryModalOpen, extendSession, handleLogout, userData } =
    useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/about-project" element={<AboutProjectPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>

      <SessionExpiryModal
        isOpen={isExpiryModalOpen}
        onExtend={extendSession}
        onLogout={handleLogout}
        isGuest={userData?.is_guest}
      />
    </>
  );
}
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
