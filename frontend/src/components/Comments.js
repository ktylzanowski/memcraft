const Comments = (props) => {
  return(
    <div>
      <h3>Komentarze:</h3>
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>Brak komentarzy</p>
      )}
    </div>
  );
};

export default Comments;
