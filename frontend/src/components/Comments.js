import classes from "./Comments.module.css"

const Comments = (props) => {
  
  return (
    <div>
      <h3>Komentarze:</h3>
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => (
          <div key={comment.id}>
            <p>
            <img src={`http://127.0.0.1:8000/media/icons/${comment.author_icon}`}  className={classes.icon} />
            {comment.author_username}
            </p>
            {comment.text}
          </div>
        ))
      ) : (
        <p>Brak komentarzy</p>
      )}
    </div>
  );
};

export default Comments;
