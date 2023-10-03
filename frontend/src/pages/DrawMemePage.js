import SingleMeme from "../components/Memes/SingleMeme";
import Comments from "../components/Memes/Comments/Comments";
import Button from "../UI/Button";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
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
    const send_meme_id = last_meme ? last_meme.id : (meme ? meme.id : 0);
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

  useEffect(() =>{
    fetchMeme()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Outlet />
      {!loading ? (
        <div>
          <SingleMeme meme={meme} error={error} />
          <Button onClick={fetchMeme}>Losuj Mema</Button>
          <Comments id={meme.id} />
        </div>
      ) : (
       <div style={{marginTop: "10%"}}> <LoadingUI /></div>
      )}
    </>
  );
};

export default DrawMeme;
