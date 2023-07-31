import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer"
import sadsteve from "../images/sadsteve.png"
import { useRouteError } from "react-router-dom";
import Button from "../UI/Button";
const Error = () => {
  const error = useRouteError();
  let message = "Napotkano na niezidentyfikowany problem!"

  if (error.status === 500){
    message = error.data.message;
  }

  else if(error.status === 404){
    message = "Nie znaleziono tej strony :((("
  }

  const handleReload = () => {
    window.location.reload();
  }

  return <>
  <Header />
  <main>
    <img src={sadsteve} alt="Error" />
    <h2>{message}</h2>
    <p>Spróbuj przejść do innej podstrony za pomocą nawigacji na górze albo odśwież stronę przyciskiem na dole!</p>
    <Button onClick={handleReload}>Odśwież</Button>
  </main>
  <Footer />
  </>
};

export default Error;
