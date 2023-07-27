import { NavLink } from "react-router-dom";
import steveface from "../../images/steveface.png";
import classes from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ModalMessage from "../../UI/ModalMessage";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const { user, logoutUser, authMessage } = useContext(AuthContext);
  let imageUrl = "";
  if (user) {
    imageUrl = `http://127.0.0.1:8000/media/${user.icon}`;
  }

  return (
    <>
    <Navbar expand="lg" className="navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand>MemCraft</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <NavLink
                to="/"
              >
                Losuj Mema
              </NavLink>
            </Nav.Link>
            {user && (
              <Nav.Link>
                <NavLink
                  to="/dodajmema"
                >
                  Dodaj Mema
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
          <Nav.Link style={{ marginRight: '15px'}}>
          {user && (
              <NavLink onClick={logoutUser}>
                Logout
              </NavLink>
          )}
          </Nav.Link>
          <Nav.Link>
          <NavLink
            to={user ? '/konto' : '/authentication'}
          >
            <div className={classes.account}>
              <img src={user ? imageUrl : steveface} alt="icon" className={classes.icon} />
              {user ? <span>{user.username}</span> : <span>Logowanie</span>}
            </div>
          </NavLink>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {authMessage && <ModalMessage>{authMessage}</ModalMessage>}
    </>
  );
};

export default Header;