import { useState } from "react";
import Button from "../UI/Button";
import { loader } from "../pages/DrawMeme";
import { useLoaderData } from "react-router";
import Image from "../UI/Image";


const SingleMeme = () => {
  const memeFromLoader = useLoaderData();
  const [meme, setMeme] = useState(memeFromLoader);
  const [error, setError] = useState(false);
  const imageUrl = new URL(meme.meme_image, "http://127.0.0.1:8000").href;

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
      {error ? (
        <span>{error}</span>
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
