import classes from "./AuthComponent.module.css";
import Modal from "../../UI/Modal";
import Login from "./Login";
import Register from "./Register";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
  const { action, setAction, setError } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (action) {
      setAction(false)
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  const handlerLogin = () => {
    setError(false);
    setIsLogin(true);
  };

  const handlerRegister = () => {
    setError(false);
    setIsLogin(false);
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
