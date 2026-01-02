import { createContext, useState, useEffect, useContext } from "react";
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

  const calculateTimeRemaining = (expTimestamp) => {
    if (!expTimestamp) return null;
    const expirationMs = expTimestamp * 1000;
    const nowMs = Date.now();
    const remainingMs = expirationMs - nowMs;

    return Math.max(0, Math.floor(remainingMs / 1000));
  };

  const extendSession = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
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
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        if (data.tokenExp) {
          setSessionTimeRemaining(calculateTimeRemaining(data.tokenExp));
        } else {
          setSessionTimeRemaining(null);
        }
      } else {
        setUserData({ username: "Invitado", email: "" });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setUserData({ username: "Error", email: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (userData && sessionTimeRemaining !== null) {
      timer = setInterval(() => {
        setSessionTimeRemaining((prev) => {
          if (prev <= 30 && !isExpiryModalOpen && prev > 0) {
            setIsExpiryModalOpen(true);
          }
          if (prev <= -600) {
            clearInterval(timer);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [userData, sessionTimeRemaining, isExpiryModalOpen]);

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
