import { useState } from "react";
const usePasswordInput = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPassword2, setEnteredPassword2] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const passwordIsValid = enteredPassword.length >= 8;
  const hasError = !passwordIsValid && isTouched;

  const passwordChangerHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const password2ChangerHandler = (event) => {
    setEnteredPassword2(event.target.value);
  };

  const passwordBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
  };

  return {
    password: enteredPassword,
    password2: enteredPassword2,
    isValid: passwordIsValid,
    hasError,
    passwordChangerHandler,
    password2ChangerHandler,
    passwordBlurHandler,

  }
    
}

export default usePasswordInput