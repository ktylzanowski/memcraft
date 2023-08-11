import { useState } from "react";
import Button from "../UI/Button";
import { useLoaderData } from "react-router";
import { Form } from "react-router-dom";
import Image from "../UI/Image";
import Error from "./Error";
import Likes from "./Likes";
import Comments from "./Comments";

const SingleMeme = () => {
  const memeFromLoader = useLoaderData();
  const last_meme = localStorage.getItem("last_meme");

  const [meme, setMeme] = useState(
    last_meme ? JSON.parse(last_meme).meme : memeFromLoader.meme
  );

  const [MemeComments, SetMemeComments] = useState(
    last_meme ? JSON.parse(last_meme).comments : memeFromLoader.comments
  );

  const [error, setError] = useState(
    memeFromLoader.message ? memeFromLoader.message : false
  );
  const imageUrl = new URL(meme.meme_image, "http://127.0.0.1:8000").href;

  const fetchMeme = async () => {
    const last_meme_id = localStorage.getItem("last_meme_id");
    const send_meme_id = last_meme_id ? last_meme_id : meme.id;
    const token = JSON.parse(localStorage.getItem("authTokens"));

    const headers = {
      "Content-Type": "application/json",
      "Meme-ID": send_meme_id,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token.access}`;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        localStorage.setItem("last_meme", JSON.stringify(data));
        localStorage.setItem("last_meme_id", data.meme.id);
        setMeme(data.meme);
        SetMemeComments(data.comments);
        setError(false);
      }
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
          <Likes
            total_likes={meme.total_likes}
            total_dislikes={meme.total_dislikes}
            id={meme.id}
            ifLike={meme.if_like}
            ifDislike={meme.if_dislike}
          />
          <Button onClick={fetchMeme}>Losuj Mema</Button>
          <Comments comments={MemeComments} />
          <Form method="post">
            <input type="text" placeholder="Komentarz" name="comment" />
            <button type="submit" name="intent" value={meme.id}>
              Dodaj komentarz
            </button>
          </Form>
        </>
      )}
    </>
  );
};

export default SingleMeme;
