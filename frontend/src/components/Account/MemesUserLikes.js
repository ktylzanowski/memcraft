import { Link } from "react-router-dom";
import classes from "./UserMemes.module.css";
import Likes from "../Memes/Likes";

const MemesUserLikes = (props) => {
  const data = props.data;

  return (
    <>
      <div className={classes.UserMemes}>
        {data.length > 0 ? (
          data.map((meme) => (
            <Link to={`/meme/${meme.id}`} key={meme.id}>
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
            </Link>
          ))
        ) : (
          <p className={classes.NoMemes}>Brak polajowanych memów!</p>
        )}
      </div>
    </>
  );
};

export default MemesUserLikes;
