import Account from "../components/Account/Account";
import { json } from "react-router-dom";
import { redirect } from "react-router-dom";

const AccountPage = () => {
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

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const intent = data.intent

  if (intent === "userInfo"){
    const response = await fetch("http://127.0.0.1:8000/accounts/info/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("OK");
    } else {
      console.log("BAD");
    }
  
    return redirect("/konto");
  }

  if (intent === "changePassword"){
    const response = await fetch("http://127.0.0.1:8000/accounts/changepassword/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + String(token.access),
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("OK");
    } else {
      console.log("BAD");
    }
  
    return redirect("/konto");
  }
 
  
}

export default AccountPage;
