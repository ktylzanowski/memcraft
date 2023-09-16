import { json } from "react-router-dom";
import { useLoaderData } from "react-router";

import SingleMeme from "../components/Memes/SingleMeme";
import Comments from "../components/Memes/Comments/Comments";
import StandartPagination from "../pagination/StandartPagination";
import usePagination from "../hooks/usePagination";
import LoadingUI from "../UI/LoadingUI";

const BoardPage = () => {
  const { data, currentPage, error, loading, onPageChange } = usePagination(
    useLoaderData(),
    process.env.REACT_APP_API_URL + "memes/"
  );
  return (
    <div>
      {error && <p>{error}</p>}
      {!loading ? (
        <div>
          {data.results.map((meme) => (
            <div key={meme.id}>
              <SingleMeme meme={meme} />
              <Comments id={meme.id} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{minHeight: 600}}> <LoadingUI /></div>
      )}
      <StandartPagination
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
    const response = await fetch(process.env.REACT_APP_API_URL + "memes/", {
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
