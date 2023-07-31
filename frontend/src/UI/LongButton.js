import classes from "./LongButton.module.css";

const LongButton = (props) =>{
    return (
    <button type="submit" className={classes.button} name="intent" value={props.value}>
    {props.children}
    </button>
  )
}

export default LongButton;
