import { useState, useEffect } from "react";

const useComments = (initialData, meme_id, isFetch = true) => {
  const [comments, setComments] = useState(initialData);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteingCommentId, setDeletingCommentId] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [totalComments, setTotalComments] = useState(0);
  const [commentPage, setCommentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [errors, setErrors] = useState(false);
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const fetchData = async (page) => {
    setLoading(true);
    const url = process.env.REACT_APP_API_URL + `comment/?page=${page}`;
    const headers = {
      "Content-Type": "application/json",
      "Meme-ID": meme_id,
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
    } finally {
      setLoading(false);
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
    setLoadingAdd(true)

    const url = process.env.REACT_APP_API_URL + "comment/";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + String(token.access),
    };

    const sendData = {
      text: enteredComment,
      meme_id: meme_id,
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
    }finally{
      setLoadingAdd(false)
    }
  };

  const deleteComment = async (commentId) => {
    setDeletingCommentId(commentId)
    const response = await fetch(
      process.env.REACT_APP_API_URL + `comment/${commentId}/`,
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
      setTotalComments(totalComments - 1);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } else {
      setErrors({ error: "Nie masz uprawnień do usunięcia tego komentarza." });
    }
    setDeletingCommentId(false)
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
    if (isFetch && !loading) {
      fetchData(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meme_id]);

  return {
    comments,
    message,
    errors,
    totalComments,
    loading,
    deleteingCommentId,
    loadingAdd,
    addNewComment,
    deleteComment,
    handleShowMore,
  };
};

export default useComments;
