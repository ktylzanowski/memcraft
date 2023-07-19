import { useState } from "react";

const useInput = (minLength) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = enteredValue.length >= minLength;
  const hasError = !valueIsValid && isTouched;

  const valueChangerHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangerHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
