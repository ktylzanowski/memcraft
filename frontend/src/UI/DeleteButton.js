import classes from "./DeleteButton.module.css";

const DeleteButton = (props) => {
  return (
    <>
      <button
        className={classes.deleteButton}
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm("Czy na pewno chcesz usunąć?")) {
            props.onClick();
          }
        }}
      >
        Usuń!
      </button>
      ;
    </>
  );
};

export default DeleteButton;
