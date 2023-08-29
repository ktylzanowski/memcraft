import { useLoaderData } from "react-router-dom";
import classes from "./UserMemes.module.css";
import DeleteButton from "../../UI/DeleteButton";
import useComments from "../../hooks/useComments";

const UserComments = (props) => {
  const data = useLoaderData();

  const {comments, message, deleteComment} = useComments(data, props)
  
  return (
    <>
    {message && <p className={classes.message }>{message}</p>}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className={classes.memeContainer} key={comment.id}>
            <img
              src={`http://127.0.0.1:8000/${comment.meme_data.meme_image}`}
              alt={comment.meme_data.title}
            />
            <div className={classes.memeInfo}>
              <h2>Tytuł: {comment.meme_data.title}</h2>
              <h2>{comment.text}</h2>
              <DeleteButton onClick={() => deleteComment(comment.id)} />
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
