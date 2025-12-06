import { createContext, useState, useEffect, useContext } from "react";
const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(null);

  const calculateTimeRemaining = (expTimestamp) => {
    if (!expTimestamp) return null;
    const expirationMs = expTimestamp * 1000;
    const nowMs = Date.now();
    const remainingMs = expirationMs - nowMs;

    return Math.max(0, Math.floor(remainingMs / 1000));
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
        if (data.is_guest && data.tokenExp) {
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
    if (userData?.is_guest && sessionTimeRemaining !== null) {
      timer = setInterval(() => {
        setSessionTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            alert("Tu sesión de invitado ha expirado. Redirigiendo a la página principal.");
            window.location.href = "/";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [userData, sessionTimeRemaining]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, loading, fetchUserData, sessionTimeRemaining }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
