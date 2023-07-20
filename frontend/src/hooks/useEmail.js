import { useEffect, useState } from "react";

const useEmailInput = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmailValid = enteredEmail.includes("@"); 
  
  useEffect(() => {
    if (!isTouched) {
      setErrorMessage("");
    } else if (!isEmailValid) {
      setErrorMessage("Nie zapomniałeś @ w mailu?");
    } else {
      setErrorMessage("");
    }
  }, [isEmailValid, isTouched]);

  const handleEmailChange = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    setIsTouched(true);
  };

  const resetEmailInput = () => {
    setEnteredEmail("");
    setIsTouched(false);
  };

  const isValid = isEmailValid;
  const hasError = !isValid && isTouched;

  return {
    email: enteredEmail,
    isValid,
    hasError,
    errorMessage,
    handleEmailChange,
    handleEmailBlur,
    resetEmailInput,
  };
};

export default useEmailInput;