import { useState } from "react";

const useDeleteComment = (data) => {
  const [comments, setComments] = useState(data);
  const [message, setMessage] = useState(false);

  const deleteCommentFetch = async (commentId) => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(
      `http://127.0.0.1:8000/comment/${commentId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
      }
    );
    if (response.ok) {
      setMessage("Usunięto komentarz!");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } else {
      setMessage("Wystąpił jakiś błąd!");
    }
  };

  return {
    comments,
    message,
    deleteCommentFetch,
  };
};

export default useDeleteComment;
