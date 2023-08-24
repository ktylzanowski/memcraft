import { useState } from "react";
import LongButton from "../../UI/LongButton";
import Modal from "react-bootstrap/Modal";
import classes from "./ChangePassword.module.css";
import { Form, useActionData } from "react-router-dom";

function ChangePassword(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const error = useActionData()

  return (
    <>
      <button  onClick={handleShow} className={classes.button}>
        Zmień Hasło
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Zmień Hasło</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error?.messagePassword && <p style={{ color: "black" }}>{error.messagePassword}</p>}
          <Form method="post">
            <input
              type="password"
              placeholder="Stare hasło"
              className={classes.input}
              name="old_password"
            ></input>
            {error?.old_password && <p style={{ color: "black" }}>{error.old_password}</p>}
            <input
              type="password"
              placeholder="Nowe hasło"
              className={classes.input}
              name="new_password"
            ></input>
            {error?.new_password && <p style={{ color: "black" }}>{error.new_password}</p>}
            <input
              type="password"
              placeholder="Potwierdź nowe hasło"
              className={classes.input}
              name="new_password2"
            ></input>
            {error?.new_password2 && <p style={{ color: "black" }}>{error.new_password2}</p>}
            {error?.non_field_errors && <p style={{ color: "black" }}>{error.non_field_errors}</p>}
            <LongButton value="changePassword">Zmień hasło</LongButton>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePassword;
