import { useState } from "react";
import Button from "../UI/Button";
import { useLoaderData } from "react-router";
import Image from "../UI/Image";
import Error from "./Error";

const SingleMeme = () => {
  const memeFromLoader = useLoaderData();
  const last_meme = localStorage.getItem("last_meme");
  const [meme, setMeme] = useState(
    last_meme ? JSON.parse(last_meme) : memeFromLoader
  );
  const [error, setError] = useState(false);
  const imageUrl = new URL(meme.meme_image, "http://127.0.0.1:8000").href;

  const fetchMeme = async () => {
    const meme_id = localStorage.getItem("last_meme_id");
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Meme-ID": meme_id,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      }
      localStorage.setItem("last_meme", JSON.stringify(data));
      localStorage.setItem("last_meme_id", data.id);
      setMeme(data);
      setError(false);
    } catch (error) {
      setError("Nie udało się złapać mema");
    }
  };

  return (
    <>
      {error ? (
        <Error message={error} />
      ) : (
        <>
          <Image imageUrl={imageUrl} alt="Meme" />
          <h1>{meme.title}</h1>
          <Button onClick={fetchMeme}>Losuj Mema</Button>
        </>
      )}
    </>
  );
};

export default SingleMeme;
