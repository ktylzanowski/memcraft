import { useState, useEffect } from "react";

const useComments = (initialData, props) => {
  const [comments, setComments] = useState(initialData);
  const [message, setMessage] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [commentPage, setCommentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [errors, setErrors] = useState(false);
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const fetchData = async (page) => {
    const url = `http://127.0.0.1:8000/comment/?page=${page}`;
    const headers = {
      "Content-Type": "application/json",
      "Meme-ID": props.id,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const responseData = await response.json();

      if (response.ok) {
        if (page === 1) {
          setErrors(false);
          setComments(responseData.results);
          setTotalComments(responseData.count);
        } else {
          setComments((prevComments) => {
            const newComments = responseData.results.filter(
              (newComment) =>
                !prevComments.some(
                  (existingComment) => existingComment.id === newComment.id
                )
            );
            return [...prevComments, ...newComments];
          });
        }
        setNextPage(responseData.next);
      } else {
        setErrors({ "404error": "Nie można pobrać komentarzy. Przepraszamy!" });
      }
    } catch {
      setErrors({ "404error": "Nie można pobrać komentarzy. Przepraszamy!" });
    }
  };

  const addNewComment = async (event, enteredComment) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    if (enteredComment === "") {
      setErrors({ text: "Komentarz nie może być pusty" });
      return;
    }

    const url = "http://127.0.0.1:8000/comment/";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + String(token.access),
    };

    const sendData = {
      text: enteredComment,
      meme_id: props.id,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(sendData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setErrors(false);
        setComments((prevComments) => [responseData.comment, ...prevComments]);
        setTotalComments(totalComments + 1);
      } else {
        setErrors(responseData.addCommentErrors);
      }
    } catch {
      setErrors("Coś poszło nie tak. Przepraszamy!");
    }
  };

  const deleteComment = async (commentId) => {
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
      setTotalComments(totalComments-1)
      if(initialData.length ===0){
        fetchData(commentPage)
      }
      
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } else {
      setErrors({"error": "Nie masz uprawnień do usunięcia tego komentarza."});
    }
  };

  const handleShowMore = () => {
    if (nextPage) {
      setCommentPage(commentPage + 1);
      fetchData(commentPage + 1);
    }
  };

  useEffect(() => {
    setErrors(false);
    setCommentPage(1);
    setTotalComments(0);
    if (initialData.length === 0) {
      fetchData(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  return {
    comments,
    message,
    errors,
    totalComments,
    addNewComment,
    deleteComment,
    handleShowMore,
  };
};

export default useComments;
