import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import MessageContext from "./MessageContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setMessage } = useContext(MessageContext);

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
  const [icon, setIcon] = useState(user ? user.icon : null);
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(true);
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
      const decode_data = jwt_decode(data.access);
      setAuthTokens(data);
      setUser(decode_data);
      setIcon(decode_data.icon);
      localStorage.setItem("authTokens", JSON.stringify(data));
      setError(false);
      setMessage("Zalogowano");
      setAction(true);
    } else {
      setError({ login: "Nieprawidłowe dane logowania. Spróbuj ponownie!" });
    }
  };

  const registerUser = async (login, email, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/accounts/user/", {
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

    const responseData = await response.json();

    if (response.ok) {
      setMessage("Zarejestrowano");
      setAction(true);
    } else {
      setError(responseData);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setMessage("Wylogowano");
  };

  const updateToken = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/accounts/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: authTokens?.refresh,
        }),
      }
    );
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
    action,
    error,
    icon,
    setAction,
    setIcon,
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
