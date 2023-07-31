import classes from "./Button.module.css"

const Button = (props) =>{
    return (
        <button type="submit" onClick={props.onClick} className={classes.button} name="intent" value={props.value}>{props.children}</button>
    )
}

export default Button;