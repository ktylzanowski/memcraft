import classes from "./DeleteButton.module.css";

const DeleteButton = ({ className, onClick, children }) => {
  return (
    <>
      <button
        className={`${classes.deleteButton} ${className}`}
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm("Czy na pewno chcesz usunąć?")) {
            onClick();
          }
        }}
      >
        {children ? children : "Usuń"}
      </button>
      ;
    </>
  );
};

export default DeleteButton;
