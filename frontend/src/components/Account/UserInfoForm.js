import classes from "./Account.module.css";
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
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nazwisko"
            defaultValue={data.last_name}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            defaultValue={data.phone}
          />
          <input
            type="text"
            name="city"
            placeholder="Miasto"
            defaultValue={data.city}
          />
          <input
            type="text"
            name="zip_code"
            placeholder="Kod pocztowy"
            defaultValue={data.zip_code}
          />
          <input
            type="text"
            name="street"
            placeholder="Ulica"
            defaultValue={data.street}
          />
          <input
            type="text"
            name="building_number"
            placeholder="Numer budynku"
            defaultValue={data.building_number}
          />
          <input
            type="text"
            name="apartment_number"
            placeholder="Numer apartamenu"
            defaultValue={data.apartment_number}
          />
          <Button>Zatwierdź</Button>
          <BackButton>Wróć</BackButton>
        </Form>
      </div>
    </>
  );
};

export default UserInfoForm;
