import { useLoaderData } from "react-router-dom";
import classes from "./UserMemes.module.css";
import Likes from "../Likes";

const MemesUserDislikes = () => {
  const data = useLoaderData();

  return (
    <>
      {data.length > 0 ? (
        data.map((meme) => (
          <div className={classes.memeContainer} key={meme.id}>
            <img src={meme.meme_image} alt={meme.title} />
            <div className={classes.memeInfo}>
              <h2>{meme.title}</h2>
              <Likes
                total_likes={meme.total_likes}
                total_dislikes={meme.total_dislikes}
                id={meme.id}
                ifLike={meme.if_like}
                ifDislike={meme.if_dislike}
              />
            </div>
          </div>
        ))
      ) : (
        <p className={classes.NoMemes}>Brak zdislikowanych memów!</p>
      )}
    </>
  );
};

export default MemesUserDislikes;
