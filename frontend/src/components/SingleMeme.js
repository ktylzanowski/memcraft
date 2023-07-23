import { useLoaderData } from "react-router-dom";
import classes from "./SingleMeme.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import { loader } from "../pages/DrawMeme";

const SingleMeme = () => {
  const memeFromLoader = useLoaderData();
  const [meme, setMeme] = useState(memeFromLoader);
  const imageUrl = `http://127.0.0.1:8000${meme.meme_image}`;

  const fetchMeme = async () => {
    localStorage.setItem("last_meme_id", meme.id);
    const response = await loader();
    const data = await response.json();
    setMeme(data);
  };

  return (
    <>
      <img src={imageUrl} alt="Meme" className={classes.image} />
      <h1>{meme.title}</h1>
      <Button onClick={fetchMeme}>Losuj Mema</Button>
    </>
  );
};

export default SingleMeme;
