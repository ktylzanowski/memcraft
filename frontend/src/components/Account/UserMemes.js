import { Link, useLoaderData } from "react-router-dom";
import classes from "./UserMemes.module.css";
import { useState } from "react";

const UserMemes = () => {
  const data = useLoaderData();
  const [memes, setMemes] = useState(data);
  const [message, setMessage] = useState(false);
  const deleteFetch = async (props) => {
    const token = JSON.parse(localStorage.getItem("authTokens"));
    const response = await fetch(`http://127.0.0.1:8000/meme/${props}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
    });
    if (response.ok) {
      setMemes((prevMemes) => prevMemes.filter((meme) => meme.id !== props));
      setMessage("Usunięto mema!");
    } else {
      setMessage("Coś poszło nie tak!")
    }
  };

  return (
    <>
      {message && <p className={classes.message}>{message}</p>}
      {memes.length > 0 ? (
        <div className={classes.UserMemes}>
          {memes.map((meme) => (
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
        </div>
      ) : (
        <p className={classes.NoMemes}>Brak memów</p>
      )}
    </>
  );
};

export default UserMemes;
