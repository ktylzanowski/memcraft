import classes from "./Button.module.css";

const Button = ({ onClick, value, children }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={classes.button}
      name="intent"
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
