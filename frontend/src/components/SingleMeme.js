import classes from "./SingleMeme.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import { loader } from "../pages/DrawMeme";

const SingleMeme = (props) => {
  const [meme, setMeme] = useState(props.initMeme);
  const [error, setError] = useState(false)
  const imageUrl = `http://127.0.0.1:8000${meme.meme_image}`;

  const fetchMeme = async () => {
    try {
      const response = await loader();
      const data = await response.json();
      setMeme(data);
      localStorage.setItem("last_meme_id", data.id);
    } catch (error) {
      setError("Wystąpił jakiś błąd, proszę odświeżyć stronę!");
    }
  };

  return (
    <>
    {error ? <span>{error}</span> : (
      <>
        <img src={imageUrl} alt="Meme" className={classes.image} />
        <h1>{meme.title}</h1>
        <Button onClick={fetchMeme}>Losuj Mema</Button>
      </>
    )}
  </>
  );
};

export default SingleMeme;
