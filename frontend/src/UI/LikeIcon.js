import classes from "./LikeIcon.module.css"

const LikeIcon = (props) => {
  return <img src={props.src} alt={props.alt} onClick={props.onClick} className={classes.img}/>;
};

export default LikeIcon;
