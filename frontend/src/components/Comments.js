import classes from "./Comments.module.css";

const Comments = (props) => {
  return (
    <div className={classes.container}>
      <h3>Komentarze:</h3>
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => (
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
    </div>
  );
};

export default Comments;
