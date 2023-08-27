import { json } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import SingleMeme from "../components/SingleMeme";
import Comments from "../components/Comments";

const DetailMemePage = () => {
  const data = useLoaderData();
  return (
    <>
      <SingleMeme meme={data} />
      <Comments id={data.id} />
    </>
  );
};

export async function loader({ params }) {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token.access}`;
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/meme/${params.id}/`, {
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
      { message: "Coś poszło nie tak. Przepraszamy!" },
      {
        status: 500,
      }
    );
  }
}

export default DetailMemePage;
