import { useContext } from "react";

import classes from "./Comments.module.css";
import AddComment from "./AddComment";
import useComments from "../../../hooks/useComments";
import CloseButton from "react-bootstrap/CloseButton";
import AuthContext from "../../../context/AuthContext";
import IconUI from "../../../UI/IconUI";
import LoadingUI from "../../../UI/LoadingUI";

const Comments = ({ id }) => {
  const {
    comments,
    errors,
    totalComments,
    loading,
    loadingAdd,
    addNewComment,
    deleteComment,
    handleShowMore,
  } = useComments([], id);
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
      {loading ? (
        <LoadingUI />
      ) : (
        totalComments > 0 && <p>Ilość komentarzy: {totalComments}</p>
      )}
      {comments.length > 0
        ? comments.map((comment) => (
            <div key={comment.id} className={classes.comment}>
              <div className={classes.userData}>
                <div className={classes.icon}>
                  <IconUI
                    src={
                      process.env.REACT_APP_API_URL +
                      `static/icons/${comment.author_icon}`
                    }
                  />
                </div>
                <div className={classes.info}>
                  <div className={classes.nickname}>
                    @{comment.author_username}
                  </div>
                  <div className={classes.text}>{comment.text}</div>
                </div>
                {user && comment.author_username === user.username && (
                  <div className={classes.delete}>
                    <CloseButton
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.confirm("Czy na pewno chcesz usunąć?")) {
                          deleteComment(comment.id);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        : !loading && <p>{errors?.["404error"] || "Brak komentarzy."}</p>}

      {totalComments > comments.length && (
        <button onClick={handleShowMore} className={classes.showMoreButton}>
          Pokaż więcej
        </button>
      )}
      <AddComment
        addNewComment={addNewComment}
        loading={loadingAdd}
        errors={errors}
      />
    </div>
  );
};

export default Comments;
