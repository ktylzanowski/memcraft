import { useState, useEffect } from "react";
import like from "../../images/likes/like.png";
import dislike from "../../images/likes/dislike.png";
import LikeIcon from "../../UI/LikeIcon";
import classes from "./Likes.module.css";
import likeUse from "../../images/likes/likeUse.png";
import dislikeUse from "../../images/likes/dislikeUse.png";

const Likes = (props) => {
  const [totalLikes, setTotalLikes] = useState(props.total_likes);
  const [totalDislikes, setTotalDislikes] = useState(props.total_dislikes);
  const [ifLike, setIfLike] = useState(props.ifLike);
  const [ifDislike, setIfDislike] = useState(props.ifDislike);

  const token = JSON.parse(localStorage.getItem("authTokens"));

  useEffect(() => {
    setTotalLikes(props.total_likes);
    setTotalDislikes(props.total_dislikes);
    setIfLike(props.ifLike);
    setIfDislike(props.ifDislike);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, props.ifLike, props.ifDislike]);

  const likeHandler = async (action) => {
    const data = {
      id: props.id,
      action: action,
    };

    const response = await fetch("http://127.0.0.1:8000/like/", {
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
      setTotalLikes(resdata.total_likes);
      setTotalDislikes(resdata.total_dislikes);
      if (action === "like") {
        setIfLike(true);
        setIfDislike(false);
      } else {
        setIfLike(false);
        setIfDislike(true);
      }
    }
  };

  return (
    <div className={classes.con}>
      <div className={classes.likes}>
        <LikeIcon
          src={ifLike ? likeUse : like}
          onClick={token ? () => likeHandler("like") : () => {}}
          alt="Like"
        />
        <span style={{color: "green"}}>{totalLikes}</span>
      </div>
      <div>
        <LikeIcon
          src={ifDislike ? dislikeUse : dislike}
          onClick={token ? () => likeHandler("dislike") : () => {}}
          alt="Dislike"
        />
        <span style={{color: "red"}}>{totalDislikes}</span>
      </div>
    </div>
  );
};

export default Likes;
