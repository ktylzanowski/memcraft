import classes from "./BackButton.module.css";
import { useNavigate } from "react-router-dom";

const BackButton = ({ onClick, children }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type="button" className={classes.button} onClick={handleGoBack}>
      {children ? children : "Wróć"}
    </button>
  );
};

export default BackButton;
