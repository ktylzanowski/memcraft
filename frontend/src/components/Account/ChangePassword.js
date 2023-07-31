import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from "./ChangePassword.module.css"

function ChangePassword() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Zmień hasło
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Zmień Hasło</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type='password' placeholder='Stare hasło' className={classes.input}>
            </input>
            <input type='password' placeholder='Nowe hasło' className={classes.input}>
            </input>
            <input type='password' placeholder='Potwierdź nowe hasło' className={classes.input}>
            </input>
            <button type='submit' className={classes.button}>
              Zapisz
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePassword;