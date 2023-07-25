import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState(false);
  const [error, setError] = useState(false);

  const loginUser = async (login, password) => {
    const response = await fetch("http://127.0.0.1:8000/accounts/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setError(false);
      setAuthMessage("Zalogowano");
      setTimeout(() => {
        setAuthMessage(false);
      }, 2000);
    } else {
      setError("Nieprawidłowe dane logowania. Spróbuj ponownie!");
    }
  };

  const registerUser = async (login, email, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        email: email,
        password: password,
        password2: password2,
      }),
    });
    if (response.ok) {
      loginUser(login, password);
    } else {
      setError("BAD")
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setAuthMessage("Wylogowano");
    setTimeout(() => {
      setAuthMessage(false);
    }, 2000);
  };

  const updateToken = async () => {
    const response = await fetch("http://127.0.0.1:8000/accounts/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      if (authTokens) {
        logoutUser();
      }
    }
    if (loading) {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    authMessage,
    error,
    setError,
    loginUser,
    registerUser,
    logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const thirtyMinutes = 1000 * 60 * 29;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, thirtyMinutes);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
