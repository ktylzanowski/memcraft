import { NavLink } from "react-router-dom";
import steveface from "../images/steveface.png";
import classes from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ModalMessage from "../UI/ModalMessage";

const Header = () => {
  let { user, logoutUser, authMessage } = useContext(AuthContext);
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.title}>MEMCRAFT</h1>
        <nav className={classes.nav}>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Losuj Mema
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink onClick={logoutUser}>Logout</NavLink>
              </li>
            )}
            <li className={classes.accountLink}>
              <NavLink
                to="/authentication"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <div className={classes.account}>
                  <img src={steveface} alt="icon" className={classes.icon} />
                  {user ? <span>{user.username}</span> : <span>Konto</span>}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {authMessage && <ModalMessage>{authMessage}</ModalMessage>}
    </>
  );
};

export default Header;
