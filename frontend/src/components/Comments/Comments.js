import { useContext } from "react";
import classes from "./Comments.module.css";
import AddComment from "./AddComment";
import useComments from "../../hooks/useComments";
import CloseButton from "react-bootstrap/CloseButton";
import AuthContext from "../../context/AuthContext";
import IconUI from "../../UI/IconUI";
import LoadingUI from "../../UI/LoadingUI";

const Comments = (props) => {
  const {
    comments,
    errors,
    totalComments,
    loading,
    addNewComment,
    deleteComment,
    handleShowMore,
  } = useComments([], props.id);
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
      {loading ? (
        <LoadingUI />
      ) : (
        totalComments > 0 && <p>Ilość komentarzy: {totalComments}</p>
      )}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={classes.comment}>
            <div className={classes.user}>
              <IconUI
                src={`http://127.0.0.1:8000/media/icons/${comment.author_icon}`}
              />
              {comment.author_username}
            </div>
            <div className={classes.text}>{comment.text}</div>
            {errors.error && <p>{errors.error}</p>}
            {user && comment.author_username === user.username ? (
              <CloseButton
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm("Czy na pewno chcesz usunąć?")) {
                    deleteComment(comment.id);
                  }
                }}
              />
            ) : (
              ""
            )}
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
