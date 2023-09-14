import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

import classes from "./UserMemes.module.css";
import usePagination from "../../hooks/usePagination";
import StandartPagination from "../../pagination/StandartPagination";

const UserMemes = () => {
  const { data, setData, currentPage, error, onPageChange } = usePagination(
    useLoaderData(),
    "http://127.0.0.1:8000/memes/usermemes/"
  );
  const [message, setMessage] = useState(false);
  const deleteFetch = async (id) => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(`http://127.0.0.1:8000/meme/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
    });
    if (response.ok) {
      setData((prevMemes) => prevMemes.filter((meme) => meme.id !== id));
      setMessage("Usunięto mema!");
    } else {
      setMessage("Coś poszło nie tak!");
    }
  };

  return (
    <>
      {error && <p className={classes.message}>{error}</p>}
      {message && <p className={classes.message}>{message}</p>}
      {data.results.length > 0 ? (
        <div className={classes.UserMemes}>
          {data.results.map((meme) => (
            <Link to={`/meme/${meme.id}`} key={meme.id}>
              <div className={classes.memeContainer}>
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
                  </p>
                  <button
                    className={classes.deleteButton}
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        window.confirm("Czy na pewno chcesz usunąć tego mema?")
                      ) {
                        deleteFetch(meme.id);
                      }
                    }}
                  >
                    Usuń mema
                  </button>
                </div>
              </div>
            </Link>
          ))}
          <StandartPagination
            count={data.count - 1}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <p className={classes.NoMemes}>Brak memów</p>
      )}
    </>
  );
};

export default UserMemes;
