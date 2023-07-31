import classes from "./BackButton.module.css";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    if (props.onClick) {
      props.onClick();
    }
  };
  
  return (
    <button type="button" className={classes.button} onClick={handleGoBack}>
      Wróć
    </button>
  );
};

export default BackButton;
