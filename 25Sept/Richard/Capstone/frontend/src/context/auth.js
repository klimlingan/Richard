import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

axios.defaults.baseURL = "http://localhost:9000";

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const hideAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const checkAuth = () => {
    const localAccessToken = localStorage.getItem("token");
    const localFirstName = localStorage.getItem("firstName");
    if (localAccessToken && localFirstName) {
      return true;
    }
    return false;
  };

  const [auth, setAuth] = useState(() => checkAuth());
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );

  const handleAuth = (accessToken, name) => {
    localStorage.clear();
    localStorage.setItem("token", accessToken);
    localStorage.setItem("firstName", name);
    setAuth(true);
    setFirstName(name);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
    setFirstName("");
    navigate("/login");
  };

  const register = async ({
    first_name,
    last_name,
    password,
    email,
    contact_number,
  }) => {
    try {
      const response = await axios.post("api/register", {
        first_name,
        last_name,
        password,
        email,
        contact_number,
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage(error.response.data.message);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("token/generate", {
        email,
        password,
      });

      const {
        data: { token, name },
      } = response.data;
      handleAuth(token, name);
      navigate("/");
    } catch (error) {
      setShowAlert(true);
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        handleLogout,
        firstName,
        showAlert,
        alertMessage,
        hideAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
