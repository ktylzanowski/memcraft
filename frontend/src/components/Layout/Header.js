import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../../context/AuthContext";
import steveface from "../../images/steveface.png";
import Notifications from "./Notifications";
import classes from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import IconUI from "../../UI/IconUI";

const Header = () => {
  const { user, logoutUser, icon } = useContext(AuthContext);
  const imageUrl = user
    ? process.env.REACT_APP_API_URL + `media/icons/${icon}`
    : steveface;

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbar-dark ${window.innerWidth > 900 ? 'sticky-top' : ""}`}
      >
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
                  <Notifications />
                </Nav.Link>
                <Nav.Link onClick={logoutUser} className={classes.logout}>
                  Wyloguj
                </Nav.Link>
              </>
            )}

            <LinkContainer to={user ? "/konto" : "/authentication"}>
              <Nav.Link>
                <div className={classes.account}>
                  <IconUI src={imageUrl} />
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
