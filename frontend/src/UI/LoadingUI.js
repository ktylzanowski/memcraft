import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingUI = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return showSpinner ? <Spinner animation="border" /> : null;
};

export default LoadingUI;
