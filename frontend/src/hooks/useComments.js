import { useState, useEffect } from "react";

const useComments = (initialData, props) => {
  const [comments, setComments] = useState(initialData);
  const [message, setMessage] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [commentPage, setCommentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [errors, setErrors] = useState(false);

  const fetchData = async (page) => {};

  const addNewComment = (newComment) => {};

  const deleteCommentFetch = async (commentId) => {};

  const handleShowMore = () => {};

  useEffect(() => {
    setCommentPage(1);
    setTotalComments(0);
    if (!initialData) {
      fetchData(1);
    }
  }, [props.id]);

  return {
    comments,
    message,
    totalComments,
    addNewComment,
    deleteCommentFetch,
    handleShowMore,
  };
};

export default useComments;
