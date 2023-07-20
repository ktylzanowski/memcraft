import { useEffect, useState } from "react";

const usePasswordInput = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPassword2, setEnteredPassword2] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isPasswordValid =
    enteredPassword.length >= 8 &&
    /[A-Z]/.test(enteredPassword) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword);
  const hasError = !isPasswordValid && isTouched;
  const isValid = isPasswordValid && enteredPassword === enteredPassword2;

  useEffect(() => {
    if (!isPasswordValid) {
      setErrorMessage(
        "Hasło musi mieć przynajmniej 8 znaków, 1 znak specjalny i jedną wielką literę."
      );
    } else {
      setIsTouched(false);
      setErrorMessage("");
    }
  }, [isPasswordValid, isTouched]);

  const handlePasswordChange = (event) => {
    setEnteredPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setEnteredPassword2(event.target.value);
  };

  const handlePasswordBlur = () => {
    setIsTouched(true);
  };

  const resetPasswordInput = () => {
    setEnteredPassword("");
    setEnteredPassword2("");
    setIsTouched(false);
  };

  return {
    password: enteredPassword,
    password2: enteredPassword2,
    isValid,
    hasError,
    errorMessage,
    handlePasswordChange,
    handlePassword2Change,
    handlePasswordBlur,
    resetPasswordInput,
  };
};

export default usePasswordInput;
