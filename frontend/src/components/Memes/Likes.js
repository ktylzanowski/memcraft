import { useState, useEffect } from "react";
import like from "../../images/likes/like.png";
import dislike from "../../images/likes/dislike.png";
import LikeIcon from "../../UI/LikeIcon";
import classes from "./Likes.module.css";
import likeUse from "../../images/likes/likeUse.png";
import dislikeUse from "../../images/likes/dislikeUse.png";

const Likes = ({ id, totalLikes, totalDislikes, ifLike, ifDislike }) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const [likeInfo, setLikeInfo] = useState({
    totalLikes,
    totalDislikes,
    ifLike,
    ifDislike,
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLikeInfo({
      totalLikes,
      totalDislikes,
      ifLike,
      ifDislike,
    });
  }, [id, ifLike, ifDislike, totalLikes, totalDislikes]);

  const likeHandler = async (action) => {
    const data = {
      id: id,
      action: action,
    };

    let newTotalLikes = likeInfo.totalLikes;
    let newTotalDislikes = likeInfo.totalDislikes;
    let newIfLike = likeInfo.ifLike;
    let newIfDislike = likeInfo.ifDislike;

    if (action === "like" && !likeInfo.ifLike) {
      newTotalLikes += 1;
      newTotalDislikes -= likeInfo.ifDislike ? 1 : 0;
      newIfLike = true;
      if (likeInfo.ifDislike) newIfDislike = false;
    } else if (action === "dislike" && !likeInfo.ifDislike) {
      newTotalDislikes += 1;
      newTotalLikes -= likeInfo.ifLike ? 1 : 0;
      newIfDislike = true;
      if (likeInfo.ifLike) newIfLike = false;
    } else if (action === "like" && likeInfo.ifLike) {
      newTotalLikes -= 1;
      newIfLike = false;
    } else if (action === "dislike" && likeInfo.ifDislike) {
      newTotalDislikes -= 1;
      newIfDislike = false;
    }

    setLikeInfo({
      totalLikes: newTotalLikes,
      totalDislikes: newTotalDislikes,
      ifLike: newIfLike,
      ifDislike: newIfDislike,
    });

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "like/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError("Błąd z zostawieniem reakcji!");
        return;
      }
    } catch (error) {
      setError(error ? error : "Błąd serwera. Przepraszamy!");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.interactionContainer}>
          <LikeIcon
            src={likeInfo.ifLike ? likeUse : like}
            onClick={token ? () => likeHandler("like") : () => {}}
            alt="Like"
          />
          <span className={classes.likes}>{likeInfo.totalLikes}</span>
        </div>
        <div className={classes.interactionContainer}>
          <LikeIcon
            src={likeInfo.ifDislike ? dislikeUse : dislike}
            onClick={token ? () => likeHandler("dislike") : () => {}}
            alt="Dislike"
          />
          <span className={classes.dislikes}>{likeInfo.totalDislikes}</span>
        </div>
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </>
  );
};

export default Likes;
