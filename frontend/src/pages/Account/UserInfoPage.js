import { json } from "react-router-dom";
import Account from "../../components/Account/Account";

const UserInfoPage = () => {
  return <Account />;
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch(
    process.env.REACT_APP_API_URL + "accounts/user/",
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

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const intent = data.intent;

  if (intent === "userInfo") {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "accounts/userinfo/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + String(token.access),
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        return { message: "Wystąpił błąd!" };
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

  if (intent === "changePassword") {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "accounts/changepassword/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + String(token.access),
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      return responseData;
    } catch {
      return { error: "Błąd połączenia z serwerem!" };
    }
  }
}

export default UserInfoPage;
