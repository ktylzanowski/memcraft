import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Account.module.css";
import AuthContext from "../context/AuthContext";
import Button from "../UI/Button";
import BackButton from "../UI/BackButton"
const Account = () => {
  const { user } = useContext(AuthContext);
  const [showIcons, setShowIcons] = useState(false);

  const handlerIcons = () => {
    setShowIcons(!showIcons);
  };
  const imageUrl = `http://127.0.0.1:8000/media/${user.icon}`;
  return (
    <Modal>
      <div className={classes.account}>
        <div className={classes.nav}>
          <ul>
            <li>Główne dane</li>
            <li>Moje memy</li>
            <li>Newsletter</li>
            <li>Historia zakupów</li>
          </ul>
        </div>
        <div className={classes.main}>
          <div className={classes.iconContainer}>
            <img src={imageUrl} alt="icon" />
            <button onClick={handlerIcons}>Pokaż ikony</button>
            {showIcons && <p>icons</p>}
          </div>
          <div className={classes.changePassword}>
            <Button>Zmień hasło</Button>
          </div>
          <div className={classes.data}>
            <h4 className={classes.title}>Dane</h4>
            <form className={classes.formRow}>
              <input type="text" placeholder="Imię" />
              <input type="text" placeholder="Nazwisko"/>
              <input type="text" placeholder="Telefon"/>
              <input type="text" placeholder="Miasto" />
              <input type="text" placeholder="Kod pocztowy" />
              <input type="text" placeholder="Ulica" />
              <input type="text" placeholder="Numer budynku" />
              <input type="text" placeholder="Numer apartamenu" />
              <Button>Zatwierdź</Button>
              <BackButton>Wróć</BackButton>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Account;
