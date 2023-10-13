import UserComments from "../../components/Account/UserComments";
import { json } from "react-router-dom";
const UserCommentsPage = () => {
  return <UserComments />;
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  if (!token) {
    throw json(
      { message: "Musisz być zalogowany!" },
      {
        status: 500,
      }
    );
  }
  const response = await fetch(
    process.env.REACT_APP_API_URL + "comment/user/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
    }
  );
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

export default UserCommentsPage;
