import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import ModalMessage from "../UI/ModalMessage";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const RootLayout = () => {
  const { authMessage, setAction, setAuthMessage } = useContext(AuthContext);

  useEffect(() => {
    setAction(false);
    const timer = setTimeout(() => {
      if (authMessage) {
        setAuthMessage(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMessage]);

  return (
    <>
      {authMessage && <ModalMessage>{authMessage}</ModalMessage>}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
