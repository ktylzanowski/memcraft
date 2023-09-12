import { useState, useEffect } from "react";
import like from "../../images/likes/like.png";
import dislike from "../../images/likes/dislike.png";
import LikeIcon from "../../UI/LikeIcon";
import classes from "./Likes.module.css";
import likeUse from "../../images/likes/likeUse.png";
import dislikeUse from "../../images/likes/dislikeUse.png";

const Likes = (props) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const [likeInfo, setLikeInfo] = useState({
    totalLikes: props.totalLikes,
    totalDislikes: props.totalDislikes,
    ifLike: props.ifLike,
    ifDislike: props.ifDislike,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLikeInfo({
      totalLikes: props.totalLikes,
      totalDislikes: props.totalDislikes,
      ifLike: props.ifLike,
      ifDislike: props.ifDislike,
    });
  }, [
    props.id,
    props.ifLike,
    props.ifDislike,
    props.totalLikes,
    props.totalDislikes,
  ]);

  const likeHandler = async (action) => {
    const data = {
      id: props.id,
      action: action,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/like/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
        body: JSON.stringify(data),
      });

      const resdata = await response.json();

      if (response.ok) {
        setLikeInfo({
          totalLikes: resdata.total_likes,
          totalDislikes: resdata.total_dislikes,
          ifLike: action === "like",
          ifDislike: action === "dislike",
        });
      } else {
        setError("Error");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    }
  };

  return (
    <div className={classes.con}>
      <div className={classes.likes}>
        <LikeIcon
          src={likeInfo.ifLike ? likeUse : like}
          onClick={
            token && !likeInfo.ifLike ? () => likeHandler("like") : () => {}
          }
          alt="Like"
        />
        <span style={{ color: "green" }}>{likeInfo.totalLikes}</span>
      </div>
      <div>
        <LikeIcon
          src={likeInfo.ifDislike ? dislikeUse : dislike}
          onClick={
            token && !likeInfo.ifDislike
              ? () => likeHandler("dislike")
              : () => {}
          }
          alt="Dislike"
        />
        <span style={{ color: "red" }}>{likeInfo.totalDislikes}</span>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Likes;
