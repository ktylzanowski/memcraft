import SingleMeme from "../components/SingleMeme";
import { json } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ModalMessage from "../UI/ModalMessage";

const DrawMeme = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let urlMessage = searchParams.get('message')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ search: '' });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, urlMessage]);

  return (
    <>
      <Outlet />
      {urlMessage && <ModalMessage>{urlMessage}</ModalMessage>}
      <SingleMeme />
    </>
  );
};

export async function loader() {
  const meme_id = localStorage.getItem("last_meme_id");
  const last_meme_id = meme_id !== null ? meme_id : 0;
  const response = await fetch("http://127.0.0.1:8000/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Meme-ID": last_meme_id,
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Coś poszło nie tak! Przepraszamy!." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
export default DrawMeme;
