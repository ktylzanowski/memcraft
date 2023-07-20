import { useContext } from "react";
import BackButton from "../../UI/BackButton";
import classes from "./AuthComponent.module.css";
import AuthContext from "../../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);


  return (
    <>
      <form onSubmit={registerUser}>
        <input
          placeholder="Login"
          type="text"
          name="login"
          className={classes.input}
        ></input>
        <input
          placeholder="email"
          type="text"
          name='email'
          className={classes.input}
        ></input>
        <input
          placeholder="Hasło"
          type="password"
          name="password"
          className={classes.input}
        ></input>
        <input
          placeholder="Powtórz Hasło"
          type="password"
          name="password2"
          className={classes.input}
        ></input>
        <button type="submit" className={classes.button}>
          Zarejestruj
        </button>
        <BackButton />
      </form>
    </>
  );
};

export default Register;
