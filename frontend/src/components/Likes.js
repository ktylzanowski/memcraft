import { useState, useEffect } from "react";

const Likes = (props) => {
  const [totalLikes, setTotalLikes] = useState(props.total_likes);
  const [totalDislikes, setTotalDislikes] = useState(props.total_dislikes);

  useEffect(() => {
    setTotalLikes(props.total_likes);
    setTotalDislikes(props.total_dislikes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  const likeHandler = async (action) => {
    const data = {
      id: props.id,
      action: action,
    };
    const token = JSON.parse(localStorage.getItem("authTokens"));

    const response = await fetch("http://127.0.0.1:8000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
      body: JSON.stringify(data),
    });

    const resdata = await response.json();

    if (!response.ok) {
      console.log("bad");
    } else {
      setTotalLikes(resdata.total_likes)
      setTotalDislikes(resdata.total_dislikes)
    }
  };

  return (
    <>
      <button onClick={() => likeHandler("like")}>Dodaj like</button>
      <span>{totalLikes}</span>
      <button onClick={() => likeHandler("dislike")}>Dodaj dislike</button>
      <span>{totalDislikes}</span>
    </>
  );
};

export default Likes;
