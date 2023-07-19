import SingleMeme from "../components/SingleMeme";
import { json } from "react-router-dom";
import { Outlet } from "react-router-dom";

const DrawMeme = () => {

  return (
    <>
      <Outlet />
      <SingleMeme />
    </>
  );
};

export async function loader() {
  const response = await fetch("http://127.0.0.1:8000/");
  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
export default DrawMeme;
