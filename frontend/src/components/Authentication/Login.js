import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import BackButton from "../../UI/BackButton";
import classes from "./AuthComponent.module.css";
import useInput from "../../hooks/useInput";
import LongButton from "../../UI/LongButton";

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
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangerHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(1);

  const isValid = loginIsValid && passwordIsValid;

  const { loginUser, error, setError } = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isValid) {
      await loginUser(enteredLogin, enteredPassword);
    } else {
      setError({login: "Nieprawidłowe dane logowania. Spróbuj ponownie!"});
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
          autoComplete="username"
        />
        {loginHasError && (
          <p className={classes.errorMessage}>Login nie może być pusty</p>
        )}
        <input
          type="password"
          className={classes.input}
          placeholder="Hasło"
          name="password"
          value={enteredPassword}
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          autoComplete="current-password"
        />
        {passwordHasError && (
          <p className={classes.errorMessage}>Hasło nie może być puste</p>
        )}
        <LongButton>Zaloguj</LongButton>
        <BackButton onClick={setError} />
        {error?.login && <p className={classes.errorMessage}>{error.login}</p>}
      </form>
    </>
  );
};

export default Login;
