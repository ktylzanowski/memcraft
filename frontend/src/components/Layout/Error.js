import sadsteve from "../../images/sadsteve.png";
import Button from "../../UI/Button";
import classes from "./Error.module.css";

const ErrorPage = ({ message }) => {
  return (
    <>
      <img src={sadsteve} alt="Error" />
      <h2 className={classes.title}>{message}</h2>
      <p className={classes.bottomText}>
        Spróbuj przejść do innej podstrony za pomocą nawigacji na górze albo
        odśwież stronę przyciskiem na dole!
      </p>
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Odśwież
      </Button>
    </>
  );
};

export default ErrorPage;
