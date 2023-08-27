import classes from "./AccountNavbar.module.css";
import { NavLink } from "react-router-dom";

const AccountNavbar = () => {
  return (
    <>
      <div className={classes.nav}>
        <ul>
          <NavLink to="/konto" replace={true} >
            <li>Główne dane</li>
          </NavLink>
          <NavLink to="/konto/mojememy" replace={true}>
            <li>Moje memy</li>
          </NavLink>
          <NavLink to="/konto/polajkowane">
            <li>Polubione</li>
          </NavLink>
          <NavLink to="/konto/zdislikowane">
            <li>Niepolubione</li>
          </NavLink>
          <NavLink to="/konto/komentarze">
            <li>Komentarze</li>
          </NavLink>
          <NavLink to="/konto/historia">
            <li>Historia Zakupów</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default AccountNavbar;
