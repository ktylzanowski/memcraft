import classes from "./LongButton.module.css";

const LongButton = ({value, children, onClick}) =>{
    return (
    <button type="submit" className={classes.button} name="intent" value={value} onClick={onClick}>
    {children}
    </button>
  )
}

export default LongButton;
