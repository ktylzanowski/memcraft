import Account from "../components/Account/Account";
import { json } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
const AccountPage = () => {
  const userInfoFromLoader = useLoaderData();
  console.log(userInfoFromLoader);
  return <Account />;
};
export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch("http://127.0.0.1:8000/accounts/info/", {
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

export default AccountPage;
