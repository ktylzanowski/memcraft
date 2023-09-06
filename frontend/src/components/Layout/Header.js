import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import steveface from "../../images/steveface.png";
import notifcation from "../../images/notification.png";
import notificationActive from "../../images/notificationActive.png"
import classes from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import useNotification from "../../hooks/useNotifications";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { notifications } = useNotification();
  const imageUrl = user
    ? `http://127.0.0.1:8000/media/icons/${user.icon}`
    : steveface;

  return (
    <>
      <Navbar expand="lg" className="navbar-dark custom-navbar" sticky="top">
        <Container fluid>
          <Navbar.Brand
            className={classes.title}
            onClick={() => {
              window.location.reload();
            }}
          >
            MEMCRAFT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Losuj Mema</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/tablica">
                <Nav.Link>Tablica</Nav.Link>
              </LinkContainer>
              {user && (
                <LinkContainer to="/dodajmema">
                  <Nav.Link>Dodaj mema</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {user && (
              <>
                <Nav.Link>
                  <img
                    src={notifications ? notificationActive : notifcation }
                    className={classes.icon}
                    style={{ marginRight: "15px" }}
                    alt="Powiadomienia"
                  />
                </Nav.Link>
                <Nav.Link onClick={logoutUser} className={classes.logout}>
                  Wyloguj
                </Nav.Link>
              </>
            )}

            <LinkContainer to={user ? "/konto" : "/authentication"}>
              <Nav.Link>
                <div className={classes.account}>
                  <img src={imageUrl} alt="icon" className={classes.icon} />
                  {user ? <span>{user.username}</span> : <span>Logowanie</span>}
                </div>
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
