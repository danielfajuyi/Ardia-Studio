import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  // Verify token on load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const loginWithGoogle = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const { data } = await axios.post(
        `${SERVER_URL}/api/auth/google`,
        { token: credential },
        { withCredentials: true },
      );
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      setUser(null);
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  };

  const registerWithEmail = async (
    name,
    email,
    password,
    additionalData = {},
  ) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/auth/register`,
        { name, email, password, ...additionalData },
        { withCredentials: true },
      );
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Registration Failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
