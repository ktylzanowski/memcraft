import classes from "./Image.module.css"

const Image = (props) =>{
    return (
        <img src={props.imageUrl} alt={props.alt} className={classes.image} />
    )
}

export default Image;