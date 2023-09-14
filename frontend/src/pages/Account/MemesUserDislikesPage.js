import { json } from "react-router-dom";
import MemesUserlikes from "../../components/Account/MemesUserLikes";

const MemesUserDislikesPage = () => {
  return <MemesUserlikes url={"http://127.0.0.1:8000/memes/user/dislikes/"} />;
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
  if (response.ok) {
    return response;
  } else {
    throw json(
      { message: "Coś poszło nie tak! Przepraszamy!." },
      {
        status: 500,
      }
    );
  }
}

export default MemesUserDislikesPage;
