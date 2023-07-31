import classes from "./LongButton.module.css";

const LongButton = (props) =>{
    return (
    <button type="submit" className={classes.button}>
    {props.children}
    </button>
  )
}

export default LongButton;
