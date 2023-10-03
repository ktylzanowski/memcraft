import { Link, useLoaderData } from "react-router-dom";

import classes from "./UserMemes.module.css";
import Likes from "../Memes/Likes";
import usePagination from "../../hooks/usePagination";
import StandartPagination from "../../pagination/StandartPagination";

const MemesUserLikes = (url) => {
  const { data, currentPage, onPageChange } = usePagination(
    useLoaderData(),
    url
  );
  return (
    <>
      <div className={classes.UserMemes}>
        {data.results.length > 0 ? (
          data.results.map((meme) => (
            <div className={classes.memeContainer} key={meme.id}>
              <Link to={`/meme/${meme.id}`}>
                <img src={meme.meme_image} alt={meme.title} />
              </Link>
              <div className={classes.memeInfo}>
                <h2>{meme.title}</h2>
                <Likes
                  totalLikes={meme.total_likes}
                  totalDislikes={meme.total_dislikes}
                  id={meme.id}
                  ifLike={meme.if_like}
                  ifDislike={meme.if_dislike}
                />
              </div>
            </div>
          ))
        ) : (
          <p className={classes.NoMemes}>Brak memów!</p>
        )}
        <StandartPagination
          count={data.count}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default MemesUserLikes;
