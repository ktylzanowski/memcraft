import classes from "./DeleteButton.module.css";

const DeleteButton = (props) => {
  return (
    <>
      <button
        className={classes.deleteButton}
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm("Czy na pewno chcesz usunąć ten komentarza?")) {
            props.onClick();
          }
        }}
      >
        Usuń mema!
      </button>
      ;
    </>
  );
};

export default DeleteButton;
