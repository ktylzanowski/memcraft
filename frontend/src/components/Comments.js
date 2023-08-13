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

  useEffect(() => {
    setCommentPage(1);
  }, [props.id]);

  useEffect(() => {
    if (dataFromAction && dataFromAction.comment.meme_id === props.id) {
      setComments([dataFromAction.comment, ...comments]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromAction]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/comment/?page=${commentPage}`,
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
          if (commentPage === 1) {
            setComments(responseData.results);
            setTotalComments(responseData.count);
          } else {
            setComments([...comments, ...responseData.results]);
          }
          setNextPage(responseData.next);
        } else {
          console.log("BAD");
        }
      } catch {
        console.log("BAD");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentPage, props.id]);

  const handleShowMore = () => {
    if (nextPage) {
      setCommentPage(commentPage + 1);
    }
  };

  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
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
        <p>Brak komentarzy</p>
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
