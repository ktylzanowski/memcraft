import UserComments from "../../components/Account/UserComments";
import { json } from "react-router-dom";
const UserCommentsPage = () => {
  return (
    <>
      <UserComments />
    </>
  );
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch("http://127.0.0.1:8000/comment/user/", {
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

export default UserCommentsPage;
