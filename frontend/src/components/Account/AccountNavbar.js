import { NavLink } from "react-router-dom";

import classes from "./AccountNavbar.module.css";

const AccountNavbar = () => {
  return (
    <>
      <div className={classes.nav}>
        <ul>
          <NavLink to="/konto" replace={true}>
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
        </ul>
      </div>
    </>
  );
};

export default AccountNavbar;
