const CommentDelete = (props) => {
  const deleteFetch = async () => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(`http://127.0.0.1:8000/comment/${props.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
    });
    if (response.ok) {
      console.log("OK");
    } else {
      console.log("BAD");
    }
  };
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm("Czy na pewno chcesz usunąć ten komentarza?")) {
            deleteFetch();
          }
        }}
      >
        Usuń mema
      </button>
    </>
  );
};

export default CommentDelete;
