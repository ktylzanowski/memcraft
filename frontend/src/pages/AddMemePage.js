import AddMeme from "../components/Memes/AddMeme";
import { redirect, json } from "react-router-dom";

const AddMemePage = () => {
  return <AddMeme />;
};

export default AddMemePage;

export async function action({ request }) {
  const data = await request.formData();
  const token = JSON.parse(localStorage.getItem("authTokens"));
  try {
    const response = await fetch("http://127.0.0.1:8000/memes/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ` + String(token.access),
      },
      body: data,
    });

    const responseData = await response.json();

    if (response.ok) {
      return redirect(`/meme/${responseData.pk}`);
    } else {
      return responseData;
    }
  } catch {
    throw json(
      { message: "Coś poszło nie tak z dodawaniem mema. Przepraszamy!" },
      {
        status: 500,
      }
    );
  }
}
