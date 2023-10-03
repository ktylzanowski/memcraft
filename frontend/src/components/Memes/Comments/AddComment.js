import classes from "./Comments.module.css";
import useInput from "../../../hooks/useInput";
import LoadingUI from "../../../UI/LoadingUI";

const AddComment = (props) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const {
    value: enteredComment,
    valueChangerHandler: commentChangedHandler,
    inputBlurHandler: commentBlurHandler,
    reset,
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
        {props.errors.text && (
          <p className={classes.error}>{props.errors.text}</p>
        )}
        <button
          type="submit"
          onClick={(event) => {
            props.addNewComment(event, enteredComment);
            reset();
          }}
          className={classes.commentInput}
          disabled={!token}
        >
          {! props.loading ? "Dodaj komentarz" : <LoadingUI />}
        </button>
      </form>
    </>
  );
};

export default AddComment;
