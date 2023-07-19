import { useLoaderData } from "react-router-dom";
import classes from "./SingleMeme.module.css";
import { useState } from "react";

const SingleMeme = () => {
  const memeFromLoader = useLoaderData();
  const [meme, setMeme] = useState(memeFromLoader);
  const [httpError, setHttpError] = useState(false);
  const imageUrl = `http://127.0.0.1:8000${meme.meme_image}`;

  const fetchMeme = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Meme-ID": meme.pk,
        },
      });
      if (!response.ok) {
        throw new Error("Coś poszło nie tak!");
      }
      const data = await response.json();
      setMeme(data);
    } catch (error) {
      setHttpError(error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className={classes.main}>
      {httpError ? (
        <div>
          <p>Wystąpił błąd: {httpError.message}</p>
          <button className={classes.button} onClick={handleReload}>
            Przeładuj stronę
          </button>
        </div>
      ) : (
        <div className={classes.layout}>
          <img src={imageUrl} alt="Meme" className={classes.image} />
          <h1>{meme.title}</h1>
          <button className={classes.button} onClick={fetchMeme}>
            Losuj Mema
          </button>
        </div>
      )}
    </main>
  );
};

export default SingleMeme;
