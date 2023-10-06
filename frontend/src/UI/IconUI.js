import classes from "./IconUI.module.css";

const IconUI = ({src, className, onClick}) => {
  return (
    <img
      src={src}
      alt="icon"
      className={`${classes.icon} ${className}`}
      onClick={onClick}
    />
  );
};

export default IconUI;
