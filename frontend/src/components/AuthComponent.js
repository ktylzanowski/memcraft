import classes from "./AuthComponent.module.css";
import Modal from "../UI/Modal";
import Login from "./Login";
import Register from "./Register";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const AuthComponent = () => {
  const { setError } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const storedTokens = localStorage.getItem("authTokens");

  useEffect(() => {
    if (storedTokens) {
      navigate("/");
    }
  }, [storedTokens, navigate]);

  const handlerLogin = () => {
    setIsLogin(true);
    setError(false);
  };

  const handlerRegister = () => {
    setIsLogin(false);
    setError(false);
  };

  return (
    <Modal>
      <div className={classes.titleContainer}>
        <button
          className={`${classes.title} ${isLogin ? classes.subtitle : ""}`}
          onClick={handlerLogin}
        >
          Logowanie
        </button>
        <button
          className={`${classes.title} ${!isLogin ? classes.subtitle : ""}`}
          onClick={handlerRegister}
        >
          Rejestracja
        </button>
      </div>

      {isLogin && <Login />}
      {!isLogin && <Register />}
    </Modal>
  );
};

export default AuthComponent;
