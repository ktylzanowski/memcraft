import { useContext } from "react";
import BackButton from "../../UI/BackButton";
import classes from "./AuthComponent.module.css";
import AuthContext from "../../context/AuthContext";
import usePasswordInput from "../../hooks/usePasswordInput";
import useInput from "../../hooks/useInput";
import useEmailInput from "../../hooks/useEmail";
import LongButton from "../../UI/LongButton";

const Register = () => {
  const { registerUser, error, setError } = useContext(AuthContext);

  const {
    value: enteredLogin,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangerHandler: loginChangedHandler,
    inputBlurHandler: loginBlurHandler,
    reset: resetLoginInput,
  } = useInput(2);

  const {
    email: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    errorMessage: emailErrorMessage,
    handleEmailChange,
    handleEmailBlur,
    resetEmailInput,
  } = useEmailInput();

  const {
    password: enteredPassword,
    password2: enteredPassword2,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    errorMessage: passwordErrorMessage,
    handlePasswordChange,
    handlePassword2Change,
    handlePasswordBlur,
    resetPasswordInput,
  } = usePasswordInput();

  const isValid = loginIsValid && passwordIsValid && emailIsValid;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (enteredPassword !== enteredPassword2) {
      setError({ error: "Hasła nie są takie same!" });
      return;
    }
    if (isValid) {
      await registerUser(
        enteredLogin,
        enteredEmail,
        enteredPassword,
        enteredPassword2
      );
      resetLoginInput();
      resetEmailInput();
      resetPasswordInput();
    } else {
      setError({error: "Nieprawidłowe dane rejestracji. Spróbuj ponownie!"});
    }
  };

  return (
    <>
      <form method="POST" onSubmit={submitHandler}>
        <input
          placeholder="Login"
          type="text"
          value={enteredLogin}
          name="login"
          className={classes.input}
          onChange={loginChangedHandler}
          onBlur={loginBlurHandler}
          autoComplete="username"
        ></input>
        {loginHasError && (
          <p className={classes.errorMessage}>
            Login musi mieć przynajmniej 2 znaki!
          </p>
        )}
        {error?.username && !loginHasError && (
          <p className={classes.errorMessage}>{error.username}</p>
        )}
        <input
          placeholder="Email"
          type="text"
          value={enteredEmail}
          name="Email"
          className={classes.input}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          autoComplete="email"
        ></input>
        {emailHasError && (
          <p className={classes.errorMessage}>{emailErrorMessage}</p>
        )}
        {error?.email && !emailErrorMessage && (
          <p className={classes.errorMessage}>{error.email}</p>
        )}
        <input
          placeholder="Hasło"
          type="password"
          value={enteredPassword}
          name="password"
          className={classes.input}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          autoComplete="new-password"
        ></input>
        {error?.password && (
          <p className={classes.errorMessage}>{error.password}</p>
        )}
        <input
          placeholder="Powtórz Hasło"
          type="password"
          value={enteredPassword2}
          name="password2"
          className={classes.input}
          onChange={handlePassword2Change}
          autoComplete="new-password"
        ></input>
        {passwordHasError && (
          <p className={classes.errorMessage}>{passwordErrorMessage}</p>
        )}
        {error?.password2 && !passwordHasError && (
          <p className={classes.errorMessage}>{error.password2}</p>
        )}
        {error?.error && <p className={classes.errorMessage}>{error.error}</p>}
        <LongButton>Zarejestruj</LongButton>
        <BackButton />
      </form>
    </>
  );
};

export default Register;
