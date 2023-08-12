import classes from "./Comments.module.css";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";

const Comments = (props) => {
  const [comments, setComments] = useState(null);
  const dataFromAction = useActionData();

  useEffect(() => {
    const fetchData = async () => {
      const meme_id = localStorage.getItem("last_meme_id");
      try {
        const response = await fetch("http://127.0.0.1:8000/comment/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Meme-ID": meme_id,
          },
        });

        const responseData = await response.json();

        if (response.ok) {
          setComments(responseData);
        } else {
          console.log("BAD");
        }
      } catch {
        console.log("BAD");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  useEffect(() => {
    if (dataFromAction) {
      setComments([dataFromAction.comment, ...comments]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromAction]);

  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={classes.comment}>
            <div className={classes.user}>
              <img
                src={`http://127.0.0.1:8000/media/icons/${comment.author_icon}`}
                className={classes.icon}
                alt="Ikona"
              />
              {comment.author_username}
            </div>
            <div className={classes.text}>{comment.text}</div>
          </div>
        ))
      ) : (
        <p>Brak komentarzy</p>
      )}
      <Form method="post" className={classes.commentInput}>
        <input
          type="text"
          placeholder="Komentarz"
          name="comment"
          className={classes.commentInput}
        />
        <button
          type="submit"
          name="intent"
          value={props.id}
          className={classes.commentInput}
        >
          Dodaj komentarz
        </button>
      </Form>
    </div>
  );
};

export default Comments;
