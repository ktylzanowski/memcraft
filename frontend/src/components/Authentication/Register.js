import { useContext } from "react";
import BackButton from "../../UI/BackButton";
import classes from "./AuthComponent.module.css";
import AuthContext from "../../context/AuthContext";
import usePasswordInput from "../../hooks/usePasswordInput";
import useInput from "../../hooks/useInput";
import useEmailInput from "../../hooks/useEmail";
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

  const submitHandler = async (event) => {
    event.preventDefault();
    if (enteredPassword !== enteredPassword2) {
      setError("Hasła nie są takie same!");
      return;
    }
    if ({ passwordIsValid } && { loginIsValid } && { emailIsValid }) {
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
      setError("Coś poszło nie tak, przepraszamy!");
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
        ></input>
        <input
          placeholder="email"
          type="text"
          value={enteredEmail}
          name="Email"
          className={classes.input}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        ></input>
        <input
          placeholder="Hasło"
          type="password"
          value={enteredPassword}
          name="password"
          className={classes.input}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        ></input>
        <input
          placeholder="Powtórz Hasło"
          type="password"
          value={enteredPassword2}
          name="password2"
          className={classes.input}
          onChange={handlePassword2Change}
        ></input>
        <button type="submit" className={classes.button}>
          Zarejestruj
        </button>
        <BackButton />
        {loginHasError && <p className={classes.errorMessage}>Login musi mieć przynajmniej 2 znaki!</p>}
        {emailHasError && <p className={classes.errorMessage}>{emailErrorMessage}</p>}
        {passwordHasError && (
          <p className={classes.errorMessage}>{passwordErrorMessage}</p>
        )}
        {error && <p className={classes.errorMessage}>{error}</p>}
      </form>
    </>
  );
};

export default Register;
