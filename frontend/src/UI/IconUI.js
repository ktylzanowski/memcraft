import classes from "./IconUI.module.css";

const IconUI = (props) => {
  return <img src={props.src} alt="icon" className={classes.icon} onClick={props.onClick}/>;
};

export default IconUI;
