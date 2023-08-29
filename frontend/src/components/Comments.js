import classes from "./Comments.module.css";
import AddComment from "./AddComment";
import useComments from "../hooks/useComments";
const Comments = (props) => {
  const { comments, errors, totalComments, addNewComment, handleShowMore } = useComments([], props);
  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
      {totalComments > 0 ? <p>Ilość komentarzy: {totalComments}</p> : null}
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
      <AddComment addNewComment={addNewComment} errors={errors} />
    </div>
  );
};

export default Comments;
