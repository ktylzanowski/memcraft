import classes from "./AccountNavbar.module.css";
import { NavLink } from "react-router-dom";

const AccountNavbar = () => {
  return (
    <>
      <div className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/konto">Główne dane</NavLink>
          </li>
          <li>
            <NavLink to="/konto/mojememy">Moje memy</NavLink>
          </li>
          <li>
            <NavLink to="/konto/likes">Polubione i nie</NavLink>
          </li>
          <li>
            <NavLink to="konto/komentarze">Komentarze</NavLink>
          </li>
          <li>
            <NavLink to="/konto/historia">Historia Zakupów</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AccountNavbar;
