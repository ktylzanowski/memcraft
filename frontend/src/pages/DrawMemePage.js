import SingleMeme from "../components/Memes/SingleMeme";
import Comments from "../components/Memes/Comments/Comments";
import Button from "../UI/Button";

import { useState } from "react";
import { json, Outlet } from "react-router-dom";
import { useLoaderData } from "react-router";
import ScrollToTop from "../utils/ScrollToTop";
import LoadingUI from "../UI/LoadingUI";

const DrawMeme = () => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const last_meme = JSON.parse(localStorage.getItem("last_meme"));
  const [loading, setLoading] = useState(false);
  const memeFromLoader = useLoaderData();
  const [meme, setMeme] = useState(last_meme ? last_meme : memeFromLoader);
  const [error, setError] = useState(false);

  const fetchMeme = async () => {
    setLoading(true);
    const send_meme_id = last_meme ? last_meme.id : meme.id;
    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
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
    } finally {
      ScrollToTop();
      setLoading(false);
    }
  };
  
  return (
    <>
      <Outlet />
      {!loading ? (
        <div>
          <SingleMeme meme={meme} error={error} />
          <Button onClick={fetchMeme}>Losuj Mema</Button>
        </div>
      ) : (
       <div style={{minHeight: 600}}> <LoadingUI /></div>
      )}
      
      <Comments id={meme.id} />
    </>
  );
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const meme_id = JSON.parse(localStorage.getItem("last_meme"));
  const last_meme_id = meme_id ? meme_id.id : 0;

  try {
    const response = await fetch(process.env.REACT_APP_API_URL, {
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
