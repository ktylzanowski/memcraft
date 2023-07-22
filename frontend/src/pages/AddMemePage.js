import AddMeme from "../components/AddMeme";
import { redirect } from "react-router-dom";
const AddMemePage = () => {
  return <AddMeme />;
};

export default AddMemePage;

export async function action({ request, params }) {
  const data = await request.formData();
  const token = localStorage.getItem('accessToken');
  const respone = await fetch("http://127.0.0.1:8000/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
  });
  if (respone.ok) {
    console.log("OK");
  } else {
    console.log("BAD");
  }

  return redirect("/");
}
