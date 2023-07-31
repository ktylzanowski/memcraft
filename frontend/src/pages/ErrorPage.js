import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useRouteError } from "react-router-dom";
import Error from "../components/Error"

const ErrorPage = () => {
  const error = useRouteError();

  let message = "Napotkano na niezidentyfikowany problem!";

  if (error.status === 500) {
    message = error.data.message;
  } else if (error.status === 404) {
    message = "Nie znaleziono tej strony :(((";
  }
  return (
    <>
      <Header />
      <main>
        <Error message={message} />
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
