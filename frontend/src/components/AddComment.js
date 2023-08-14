import classes from "./Comments.module.css";
import useInput from "../hooks/useInput";

const AddComment = (props) => {
  const {
    value: enteredComment,
    valueChangerHandler: commentChangedHandler,
    inputBlurHandler: commentBlurHandler,
  } = useInput(1);

  const submitComment = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("authTokens"));
    const sendData = {
      text: enteredComment,
      meme_id: props.id,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
        body: JSON.stringify(sendData),
      });

      const responseData = await response.json();

      if (response.ok) {
        props.addNewComment(responseData.comment)
      } else {
        console.log(responseData);
      }
    } catch {
      console.log("BAD");
    }
  };

  return (
    <>
      <form method="POST" className={classes.commentInput}>
        <input
          type="text"
          placeholder="Komentarz"
          name="comment"
          className={classes.commentInput}
          value={enteredComment}
          onChange={commentChangedHandler}
          onBlur={commentBlurHandler}
        />
        <button type="submit" onClick={submitComment} className={classes.commentInput}>
          Dodaj komentarz
        </button>
      </form>
    </>
  );
};

export default AddComment;
