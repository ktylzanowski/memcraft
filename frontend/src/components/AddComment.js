import classes from "./Comments.module.css";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
const AddComment = (props) => {
  const [error, setError] = useState(false);
  const token = JSON.parse(localStorage.getItem("authTokens"));

  useEffect(() => {
    setError(false);
  }, [props.id]);

  const {
    value: enteredComment,
    isValid: commentIsValid,
    valueChangerHandler: commentChangedHandler,
    inputBlurHandler: commentBlurHandler,
  } = useInput(1);

  const submitComment = async (event) => {
    event.preventDefault();
    if (!token) {
      return;
    }
    if (commentIsValid) {
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
          setError(false);
          props.addNewComment(responseData.comment);
        } else {
          setError(responseData.text);
        }
      } catch {
        setError("Coś poszło nie tak. Przepraszamy!");
      }
    } else {
      setError("Komentarz nie może być pusty");
    }
  };

  return (
    <>
      <form method="POST" className={classes.commentInput}>
        <input
          type="text"
          placeholder={token ? "Komentarz" : "Musisz być zalogowany aby zostawić komentarz."}
          name="comment"
          className={classes.commentInput}
          value={enteredComment}
          onChange={commentChangedHandler}
          onBlur={commentBlurHandler}
          disabled={!token}
        />
        {error && <p className={classes.error}>{error}</p>}
        <button
          type="submit"
          onClick={submitComment}
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
