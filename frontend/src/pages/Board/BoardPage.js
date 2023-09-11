import { json } from "react-router-dom";
import { useLoaderData } from "react-router";
import { useState } from "react";

import SingleMeme from "../../components/Memes/SingleMeme";
import Comments from "../../components/Memes/Comments/Comments";
import BoardPagination from "./BoardPagination";

const BoardPage = () => {
  const [data, setData] = useState(useLoaderData());
  const [currentPage, setCurrentPage] = useState(1);
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
        console.log("Bad");
      }
    } catch {
      console.log("BAD");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
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