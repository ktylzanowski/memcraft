import SingleMeme from "../components/SingleMeme";
import { json } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ModalMessage from "../UI/ModalMessage";
import { useLoaderData } from "react-router";
import Button from "../UI/Button";
import Comments from "../components/Comments";

const DrawMeme = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let urlMessage = searchParams.get("message");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ search: "" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, urlMessage]);

  const memeFromLoader = useLoaderData();
  const last_meme = localStorage.getItem("last_meme");

  const [meme, setMeme] = useState(
    last_meme ? JSON.parse(last_meme).meme : memeFromLoader.meme
  );

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
      } else {
        localStorage.setItem("last_meme", JSON.stringify(data));
        localStorage.setItem("last_meme_id", data.meme.id);
        setMeme(data.meme);
      }
    } catch (error) {
      console.log("Bad");
    }
  };

  return (
    <>
      <Outlet />
      {urlMessage && <ModalMessage>{urlMessage}</ModalMessage>}
      <SingleMeme meme={meme} />
      <Button onClick={fetchMeme}>Losuj Mema</Button>
      <Comments id={meme.id} />
    </>
  );
};

export async function loader() {
  const meme_id = localStorage.getItem("last_meme_id");
  const last_meme_id = meme_id !== null ? meme_id : 0;
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const headers = {
    "Content-Type": "application/json",
    "Meme-ID": last_meme_id,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token.access}`;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/", {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      return response;
    } else {
      const error = await response.json();
      return error;
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
