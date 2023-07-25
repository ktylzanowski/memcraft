import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer"
import classes from "./Root.module.css"
import sadsteve from "../images/sadsteve.png"
const Error = () => {
  return <>
  <Header />
  <main className={classes.main}>
    <img src={sadsteve} alt="Error" />
    <h2>Nie znaleziono tej strony :(((</h2>
  </main>
  <Footer />
  </>
};

export default Error;
