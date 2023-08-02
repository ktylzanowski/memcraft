import { useState } from 'react';
import LongButton from "../../UI/LongButton"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from "./ChangePassword.module.css"
import { Form } from "react-router-dom";

function ChangePassword(props) {
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
          <Form method='post'>
            <input type='password' placeholder='Stare hasło' className={classes.input} name="old_password">
            </input>
            {props.errors?.old_password && <span>{props.errors.old_password}</span>}
            <input type='password' placeholder='Nowe hasło' className={classes.input} name="new_password">
            </input>
            {props.errors?.new_password && <span>{props.errors.new_password}</span>}
            <input type='password' placeholder='Potwierdź nowe hasło' className={classes.input} name="new_password2">
            </input>
            {props.errors?.new_password2 && <span>{props.errors.new_password2}</span>}
            <LongButton value="changePassword">Zmień hasło</LongButton>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePassword;