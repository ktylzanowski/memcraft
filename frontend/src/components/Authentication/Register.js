import { useContext } from "react";
import BackButton from "../../UI/BackButton";
import classes from "./AuthComponent.module.css";
import AuthContext from "../../context/AuthContext";
import usePasswordInput from "../../hooks/usePasswordInput";
import useInput from "../../hooks/useInput";
const Register = () => {
  const { registerUser, error } = useContext(AuthContext);

  const {
    value: enteredLogin,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangerHandler: loginChangedHandler,
    inputBlurHandler: loginBlurHandler,
  } = useInput(2);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangerHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(2);
  
  const {
    password: enteredPassword,
    password2: enteredPassword2,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    passwordChangerHandler: passwordChangedHandler,
    password2ChangerHandler: password2ChangeHandler,
    passwordBlurHandler,
  } = usePasswordInput();
  
  
  const submitHandler = async (event) =>{
    event.preventDefault();
    if ({passwordIsValid} && {loginIsValid} && {emailIsValid}){
      await registerUser(enteredLogin, enteredEmail, enteredPassword, enteredPassword2)
    }else{
      console.log("error")
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
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
          name='email'
          className={classes.input}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
        ></input>
        <input
          placeholder="Hasło"
          type="password"
          value={enteredPassword}
          name="password"
          className={classes.input}
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
        ></input>
        <input
          placeholder="Powtórz Hasło"
          type="password"
          value={enteredPassword2}
          name="password2"
          className={classes.input}
          onChange={password2ChangeHandler}
        ></input>
        <button type="submit" className={classes.button}>
          Zarejestruj
        </button>
        <BackButton />
        {loginHasError && <p className={classes.errorMessage}>Login</p>}
        {emailHasError && <p className={classes.errorMessage}>Email</p>}
        {passwordHasError && <p className={classes.errorMessage}>Hasło</p>}
        {error && <p className={classes.errorMessage}>{error}</p>}
      </form>
    </>
  );
};

export default Register;
