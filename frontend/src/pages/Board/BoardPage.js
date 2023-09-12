import { json } from "react-router-dom";
import { useLoaderData } from "react-router";
import { useState } from "react";

import ScrollToTop from "../../utils/ScrollToTop";
import SingleMeme from "../../components/Memes/SingleMeme";
import Comments from "../../components/Memes/Comments/Comments";
import BoardPagination from "./BoardPagination";

const BoardPage = () => {
  const [data, setData] = useState(useLoaderData());
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const onPageChange = async (newPage) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/memes/?page=${newPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        setCurrentPage(newPage);
        setData(responseData);
      } else {
        setError("Coś poszło nie tak z ładowaniem komentarzy.");
      }
    } catch {
      setError("Coś poszło nie tak z ładowaniem komentarzy.");
    } finally {
      ScrollToTop();
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {data.results.map((meme) => (
        <div key={meme.id}>
          <SingleMeme meme={meme} />
          <Comments id={meme.id} />
        </div>
      ))}
      <BoardPagination
        count={data.count}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BoardPage;

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  try {
    const response = await fetch("http://127.0.0.1:8000/memes/", {
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
      { message: "Coś poszło nie tak! Przepraszamy!." },
      {
        status: 500,
      }
    );
  }
}
