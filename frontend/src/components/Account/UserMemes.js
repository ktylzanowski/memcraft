import { useLoaderData } from "react-router-dom";
import classes from "./UserMemes.module.css";

const UserMemes = () => {
  const data = useLoaderData();

  return (
    <div className={classes.UserMemes}>
      {data.map((meme) => (
        <div className={classes.memeContainer} key={meme.id}>
          <img src={meme.meme_image} alt={meme.title} />
          <div className={classes.memeInfo}>
            <h2>{meme.title}</h2>
            <p className={`${classes.likes} ${classes.memeDetail}`}>
              Ilość like'ów: {meme.total_likes}
            </p>
            <p className={`${classes.dislikes} ${classes.memeDetail}`}>
              Ilość dislike'ów: {meme.total_dislikes}
            </p>
            <p className={`${classes.comments} ${classes.memeDetail}`}>
              Ilość komentarzy: {meme.total_comments}
              <p><a className={classes.viewComments}>Kliknij aby je zobaczyć!</a></p>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMemes;