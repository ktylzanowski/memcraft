import classes from "./Comments.module.css";
import useInput from "../hooks/useInput";

const AddComment = (props) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const {
    value: enteredComment,
    valueChangerHandler: commentChangedHandler,
    inputBlurHandler: commentBlurHandler,
  } = useInput(1);

  return (
    <>
      <form method="POST" className={classes.commentInput}>
        <input
          type="text"
          placeholder={
            token
              ? "Komentarz"
              : "Musisz być zalogowany aby zostawić komentarz."
          }
          name="comment"
          className={classes.commentInput}
          value={enteredComment}
          onChange={commentChangedHandler}
          onBlur={commentBlurHandler}
          disabled={!token}
        />
        {props.errors && <p className={classes.error}>{props.errors}</p>}
        <button
          type="submit"
          onClick={(event) => props.addNewComment(event, enteredComment)}
          className={classes.commentInput}
          disabled={!token}
        >
          Dodaj komentarz
        </button>
      </form>
    </>
  );
};

export default AddComment;
