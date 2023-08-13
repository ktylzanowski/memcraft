import { json } from "react-router-dom";
import { useLoaderData } from "react-router";
import Board from "../components/Board";

const BoardPage = () => {
  const data = useLoaderData();

  return (
    <div>
      {data.results.map((meme) => (
        <Board key={meme.id} meme={meme} />
      ))}
    </div>
  );
};

export default BoardPage;

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token.access}`;
  }
  try {
    const response = await fetch("http://127.0.0.1:8000/memes/", {
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
