import { NavLink } from "react-router-dom";
import steveface from "../../images/steveface.png";
import classes from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ModalMessage from "../../UI/ModalMessage";

const Header = () => {
  const { user, logoutUser, authMessage } = useContext(AuthContext);
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.title}>MEMCRAFT</h1>
        <nav className={classes.nav}>
          <ul>
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
               <NavLink
                 to="/dodajmema"
                 className={({ isActive }) =>
                   isActive ? classes.active : undefined
                 }
                 end
               >
                 Dodaj Mema
               </NavLink>
             </li>
            )}
            {user && (
              <li>
                <NavLink onClick={logoutUser}>Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
          <div>
          <NavLink
            to="/authentication"
          >
            <div className={classes.account}>
              <img src={steveface} alt="icon" className={classes.icon} />
              {user ? <span>{user.username}</span> : <span>Konto</span>}
            </div>
          </NavLink>
          </div>
      </header>
      {authMessage && <ModalMessage>{authMessage}</ModalMessage>}
    </>
  );
};

export default Header;
