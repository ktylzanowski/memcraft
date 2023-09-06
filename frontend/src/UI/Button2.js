import classes from "./Button2.module.css"

const Button2 = (props) =>{
    return (
        <button type="submit" onClick={props.onClick} className={classes.button} name="intent" value={props.value}>{props.children}</button>
    )
}

export default Button2;