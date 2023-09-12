import { json, useLoaderData } from "react-router-dom";
import SingleMeme from "../components/Memes/SingleMeme";
import Comments from "../components/Memes/Comments/Comments";

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

  try {
    const response = await fetch(`http://127.0.0.1:8000/meme/${params.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token.access}` : null,
      },
    });

    if (response.ok) {
      return response;
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
