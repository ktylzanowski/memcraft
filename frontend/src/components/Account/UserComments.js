import { useLoaderData, Link } from "react-router-dom";

import classes from "./UserMemes.module.css";
import DeleteButton from "../../UI/DeleteButton";
import useComments from "../../hooks/useComments";
import LoadingUI from "../../UI/LoadingUI";

const UserComments = (props) => {
  const data = useLoaderData();

  const { comments, message, errors, deleteingCommentId, deleteComment } =
    useComments(data, props, false);
  return (
    <>
      {message && <p className={classes.message}>{message}</p>}
      {errors && <p className={classes.message}>{errors}</p>}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className={classes.memeContainer} key={comment.id}>
            <Link to={`/meme/${comment.meme_data.id}`}>
              <img
                src={comment.meme_data.meme_image}
                alt={comment.meme_data.title}
              />
            </Link>
            <div className={classes.memeInfo}>
              <h2>Tytuł: {comment.meme_data.title}</h2>
              <h2>{comment.text}</h2>

              <DeleteButton onClick={() => deleteComment(comment.id)}>
                {deleteingCommentId !== comment.id ? "Usuń" : <LoadingUI />}
              </DeleteButton>
            </div>
          </div>
        ))
      ) : (
        <p className={classes.NoMemes}>Brak komentarzy!</p>
      )}
    </>
  );
};

export default UserComments;
