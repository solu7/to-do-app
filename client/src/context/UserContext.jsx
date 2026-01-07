import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { logoutUser } from "../features/auth/services/authServices";
import SessionExpiryModal from "../core/components/SessionExpiryModal/SessionExpiryModal";
const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(null);
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setUserData(null);
      setSessionTimeRemaining(null);
      setIsExpiryModalOpen(false);
      window.location.href = "/";
    } else {
      console.error("Error al cerrar sesión:", result.error);
      window.location.href = "/";
    }
  };

  const authorizedFetch = useCallback(
    async (url, options = {}) => {
      const response = await fetch(url, { ...options, credentials: "include" });
      if (response.status === 401) {
        handleLogout();
      }
      return response;
    },
    [handleLogout]
  );

  const refreshTimer = useCallback(() => {
    if (!userData?.tokenExp) return;
    const remaining = Math.floor(
      (userData.tokenExp * 1000 - Date.now()) / 1000
    );
    setSessionTimeRemaining(remaining);
    if (remaining <= 30 && remaining > 0 && !isExpiryModalOpen) {
      setIsExpiryModalOpen(true);
    }
    if (remaining <= -600) {
      handleLogout();
    }
  }, [userData, isExpiryModalOpen, handleLogout]);

  const extendSession = async () => {
    try {
      const response = await authorizedFetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        await fetchUserData();
        setIsExpiryModalOpen(false);
      }
    } catch (error) {
      console.error("Error renovando sesión", error);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await authorizedFetch(`${API_URL}/users`);
      if (response && response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setUserData({ username: "Invitado", email: "", is_guest: true });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setUserData({ username: "Error", email: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData?.tokenExp) return;

    window.addEventListener("focus", refreshTimer);
    const interval = setInterval(refreshTimer, 1000);

    return () => {
      window.removeEventListener("focus", refreshTimer);
      clearInterval(interval);
    };
  }, [userData?.tokenExp, refreshTimer]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, loading, fetchUserData, sessionTimeRemaining }}
    >
      {children}
      <SessionExpiryModal
        isOpen={isExpiryModalOpen}
        onExtend={extendSession}
        onLogout={handleLogout}
        isGuest={userData?.is_guest}
      />
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
