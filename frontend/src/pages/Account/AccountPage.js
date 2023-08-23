import { json } from "react-router-dom";
import AccountRoot from "../../components/Account/AccountRoot";

const AccountPage = () => {
  return <AccountRoot />
};

export async function loader() {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const response = await fetch("http://127.0.0.1:8000/accounts/user/", {
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

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const intent = data.intent;

  if (intent === "userInfo") {
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/userinfo/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(token.access),
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        console.log(responseData);
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
        "http://127.0.0.1:8000/accounts/changepassword/",
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

      if (response.ok) {
        return responseData;
      } else {
        console.log(responseData)
        return responseData;
      }
    } catch {
      throw json(
        {
          message:
            "Coś poszło nie tak! Przepraszamy! Twoje hasło nie zostało zmienione.",
        },
        {
          status: 500,
        }
      );
    }
  }
}

export default AccountPage;
