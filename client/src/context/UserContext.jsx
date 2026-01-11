import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { logoutUser } from "../features/auth/services/authServices";
import SessionExpiryModal from "../core/components/SessionExpiryModal/SessionExpiryModal";
import { useNavigation } from "../core/hooks/useNavigation";
const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
  const { goToHome } = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(null);
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    console.log("DEBUG: Iniciando proceso de Logout real");

    try {
      const result = await logoutUser();

      if (result.success) {
        setUserData(null);
        setIsAuthenticated(false);
        setSessionTimeRemaining(null);
        setIsExpiryModalOpen(false);

        goToHome();
      } else {
        throw new Error(result.error || "Error desconocido en el servidor");
      }
    } catch (error) {
      console.error("No se pudo cerrar la sesión:", error);
      setUserData(null);
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  }, []);

  const authorizedFetch = useCallback(
    async (url, options = {}) => {
      const response = await fetch(url, { ...options, credentials: "include" });

      if (response.status === 401 && isAuthenticated) {
        handleLogout();
      }
      return response;
    },
    [handleLogout, isAuthenticated]
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

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsAuthenticated(true);
      } else {
        setUserData(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("DEBUG: Reiniciando Intervalo");
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
      value={{
        userData,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        fetchUserData,
        sessionTimeRemaining,
        handleLogout,
      }}
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
  console.log("DEBUG: Renderizando UserProvider");
  return useContext(UserContext);
};
