import SingleMeme from "../components/Memes/SingleMeme";
import Comments from "../components/Memes/Comments/Comments";
import Button from "../UI/Button";

import { useState } from "react";
import { json, Outlet } from "react-router-dom";
import { useLoaderData } from "react-router";
import ScrollToTop from "../utils/ScrollToTop";

const DrawMeme = () => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const memeFromLoader = useLoaderData();
  const last_meme = localStorage.getItem("last_meme");
  const [meme, setMeme] = useState(
    last_meme ? JSON.parse(last_meme) : memeFromLoader
  );
  const [error, setError] = useState(false);

  const fetchMeme = async () => {
    const send_meme_id = last_meme.id ? last_meme.id : meme.id;

    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Meme-ID": send_meme_id,
          Authorization: token ? `Bearer ${token.access}` : null,
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("last_meme", JSON.stringify(data));
        setMeme(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Nie udało się złapać mema, przepraszamy!");
    }
    ScrollToTop();
  };

  return (
    <>
      <Outlet />
      <SingleMeme meme={meme} error={error} />
      <Button onClick={fetchMeme}>Losuj Mema</Button>
      <Comments id={meme.id} />
    </>
  );
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const meme_id = localStorage.getItem("last_meme".id);
  const last_meme_id = meme_id !== null ? meme_id : 0;

  try {
    const response = await fetch("http://127.0.0.1:8000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Meme-ID": last_meme_id,
        Authorization: token ? `Bearer ${token.access}` : null,
      },
    });

    if (response) {
      return response;
    }
  } catch {
    throw json(
      { message: "Coś poszło nie tak! Przepraszamy!." },
      {
        status: 500,
      }
    );
  }
}
export default DrawMeme;
