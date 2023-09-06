import { json, useLoaderData } from "react-router-dom";
import MemesUserlikes from "../../components/Account/MemesUserLikes";

const MemesUserDislikesPage = () => {
  const data = useLoaderData();
  return (
    <>
      <MemesUserlikes data={data} />
    </>
  );
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch("http://127.0.0.1:8000/memes/user/dislikes/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + String(token.access),
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

export default MemesUserDislikesPage;
