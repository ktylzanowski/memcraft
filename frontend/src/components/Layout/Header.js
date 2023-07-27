import steveface from "../../images/steveface.png";
import classes from "./Header.module.css";
import "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ModalMessage from "../../UI/ModalMessage";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  const { user, logoutUser, authMessage } = useContext(AuthContext);
  let imageUrl = "";
  if (user) {
    imageUrl = `http://127.0.0.1:8000/media/${user.icon}`;
  }

  return (
    <>
      <Navbar expand="lg" className="navbar-dark custom-navbar">
        <Container fluid>
          <Navbar.Brand>MemCraft</Navbar.Brand>
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
              {user && (
                <LinkContainer to="/dodajmema">
                  <Nav.Link>Dodaj mema</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {user && (
              <Nav.Link onClick={logoutUser} style={{ marginRight: "15px" }}>
                Wyloguj
              </Nav.Link>
            )}

            <LinkContainer to={user ? "/konto" : "/authentication"}>
              <Nav.Link>
                <div className={classes.account}>
                  <img
                    src={user ? imageUrl : steveface}
                    alt="icon"
                    className={classes.icon}
                  />
                  {user ? <span>{user.username}</span> : <span>Logowanie</span>}
                </div>
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {authMessage && <ModalMessage>{authMessage}</ModalMessage>}
    </>
  );
};

export default Header;
