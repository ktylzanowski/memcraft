import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import ModalMessage from "../UI/ModalMessage";
import { useEffect } from "react";
import { useContext } from "react";
import MessageContext from "../context/MessageContext";

const RootLayout = () => {
  const { message, setMessage } = useContext(MessageContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) {
        setMessage(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      {message && <ModalMessage>{message}</ModalMessage>}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
