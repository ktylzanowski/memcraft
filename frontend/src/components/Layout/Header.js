import { NavLink } from "react-router-dom";
import steveface from "../../images/steveface.png";
import classes from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ModalMessage from "../../UI/ModalMessage";

const Header = () => {
  const { user, logoutUser, authMessage } = useContext(AuthContext);
  let imageUrl = ""
  if (user){
     imageUrl = `http://127.0.0.1:8000/media/${user.icon}`;
  }
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
           to={user ? '/konto' : '/authentication'}
          >
            <div className={classes.account}>
              <img src={user ? imageUrl : steveface} alt="icon" className={classes.icon} />
              {user ? <span>{user.username}</span> : <span>Logowanie</span>}
            </div>
          </NavLink>
          </div>
      </header>
      {authMessage && <ModalMessage>{authMessage}</ModalMessage>}
    </>
  );
};

export default Header;
