import classes from "./Image.module.css";

const Image = (props) => {
  return (
    <img
      name="image"
      id="image"
      src={props.imageUrl}
      alt={props.alt}
      className={classes.image}
    />
  );
};

export default Image;
