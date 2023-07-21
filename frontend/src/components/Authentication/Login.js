import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import BackButton from "../../UI/BackButton";
import classes from "./AuthComponent.module.css";
import useInput from "../../hooks/useInput";

const Login = () => {
  const {
    value: enteredLogin,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangerHandler: loginChangedHandler,
    inputBlurHandler: loginBlurHandler,
  } = useInput(1);

  const {
    value: enteredPassword,
    isValid: PasswordIsValid,
    hasError: PasswordHasError,
    valueChangerHandler: PasswordChangedHandler,
    inputBlurHandler: PasswordBlurHandler,
  } = useInput(1);



  const { loginUser, error, setError } = useContext(AuthContext);
 
  const submitHandler = async (event) => {
    event.preventDefault();

    if ((loginIsValid, PasswordIsValid)) {
      await loginUser(enteredLogin, enteredPassword);
    }else{
      setError("Nieprawidłowe dane logowania. Spróbuj ponownie!")
    }
  };

  return (
    <>
      <form method="POST" onSubmit={submitHandler}>
        <input
          type="text"
          className={classes.input}
          placeholder="Login"
          name="username"
          value={enteredLogin}
          onChange={loginChangedHandler}
          onBlur={loginBlurHandler}
        />
        <input
          type="password"
          className={classes.input}
          placeholder="Hasło"
          name="password"
          value={enteredPassword}
          onChange={PasswordChangedHandler}
          onBlur={PasswordBlurHandler}
        />
        <button type="submit" className={classes.button}>
          Zaloguj
        </button>
        <BackButton onClick={setError} />
        {loginHasError && <p className={classes.errorMessage}>Login nie może być pusty</p>}
        {PasswordHasError && <p className={classes.errorMessage}>Hasło nie może być puste</p>}
        {error && <p className={classes.errorMessage}>{error}</p>}
      </form>
    </>
  );
};

export default Login;
