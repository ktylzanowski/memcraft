import classes from "./UserInfoForm.module.css";
import Button from "../../UI/Button";
import BackButton from "../../UI/BackButton";
import { Form } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const UserInfoForm = () => {
  const data = useLoaderData();

  return (
    <>
      <div className={classes.data}>
        <h4 className={classes.title}>Dane potrzebne do zakupów</h4>
        <Form method="post" className={classes.formRow}>
          <input
            type="text"
            name="first_name"
            placeholder="Imię"
            defaultValue={data.first_name}
            autoComplete="given-name"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nazwisko"
            defaultValue={data.last_name}
            autoComplete="family-name"
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            defaultValue={data.phone}
            autoComplete="tel"
          />
          <input
            type="text"
            name="city"
            placeholder="Miasto"
            defaultValue={data.city}
            autoComplete="address-level1"
          />
          <input
            type="text"
            name="zip_code"
            placeholder="Kod pocztowy"
            defaultValue={data.zip_code}
            autoComplete="postal-code"
          />
          <input
            type="text"
            name="street"
            placeholder="Ulica"
            defaultValue={data.street}
            autoComplete="street-address"
          />
          <Button value="userInfo">Zatwierdź</Button>
          <BackButton>Wróć</BackButton>
        </Form>
      </div>
    </>
  );
};

export default UserInfoForm;
