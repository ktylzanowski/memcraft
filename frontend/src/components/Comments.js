import classes from "./Comments.module.css";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  const dataFromAction = useActionData();
  const [totalComments, setTotalComments] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [errors, setErrors] = useState(false);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/comment/?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Meme-ID": props.id,
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        if (page === 1) {
          setErrors(false);
          setComments(responseData.results);
          setTotalComments(responseData.count);
        } else {
          setComments([...comments, ...responseData.results]);
        }
        setNextPage(responseData.next);
      } else {
        setErrors({ "404error": "Nie można pobrać komentarzy. Przepraszamy!" });
      }
    } catch {
      setErrors({ "404error": "Nie można pobrać komentarzy. Przepraszamy!" });
    }
  };

  useEffect(() => {
    setCommentPage(1);
    setTotalComments(0);
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  useEffect(() => {
    if (dataFromAction && dataFromAction.comment.meme_id === props.id) {
      setComments([dataFromAction.comment, ...comments]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromAction]);

  const handleShowMore = () => {
    if (nextPage) {
      setCommentPage(commentPage + 1);
      fetchData(commentPage + 1);
    }
  };

  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
      {totalComments > 0 ? (
        <p>Ilość komentarzy: {totalComments}</p>
      ) : null}
      {comments.length > 0 ? (
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
        <p>{errors ? errors["404error"] : "Brak komentarzy."}</p>
      )}
      {totalComments > comments.length && (
        <button onClick={handleShowMore} className={classes.showMoreButton}>
          Pokaż więcej
        </button>
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
