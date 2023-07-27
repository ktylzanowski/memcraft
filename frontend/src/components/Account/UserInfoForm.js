import classes from "./Account.module.css";
import Button from "../../UI/Button";
import BackButton from "../../UI/BackButton";

const UserInfoForm = () => {
  return (
    <>
      <div className={classes.data}>
        <h4 className={classes.title}>Dane</h4>
        <form className={classes.formRow}>
          <input type="text" placeholder="Imię" />
          <input type="text" placeholder="Nazwisko" />
          <input type="text" placeholder="Telefon" />
          <input type="text" placeholder="Miasto" />
          <input type="text" placeholder="Kod pocztowy" />
          <input type="text" placeholder="Ulica" />
          <input type="text" placeholder="Numer budynku" />
          <input type="text" placeholder="Numer apartamenu" />
          <Button>Zatwierdź</Button>
          <BackButton>Wróć</BackButton>
        </form>
      </div>
    </>
  );
};

export default UserInfoForm;
