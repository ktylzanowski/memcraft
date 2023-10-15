import { useState, useContext, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

import MessageContext from "../../context/MessageContext";
import LongButton from "../../UI/LongButton";
import Button2 from "../../UI/Button2";
import Modal from "react-bootstrap/Modal";
import classes from "./ChangePassword.module.css";
import LoadingUI from "../../UI/LoadingUI";

function ChangePassword() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setLoading(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);
  const response = useActionData();
  useEffect(() => {
    if (response?.messagePassword) {
      setLoading(false)
      setMessage("Zmieniono hasło!");
      navigate("/");
    }else{
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <Button2 onClick={handleShow}>Zmień hasło</Button2>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Zmień Hasło</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post">
            <input
              type="password"
              placeholder="Stare hasło"
              className={classes.input}
              name="old_password"
            ></input>
            {response?.old_password && (
              <p style={{ color: "black" }}>{response.old_password}</p>
            )}
            <input
              type="password"
              placeholder="Nowe hasło"
              className={classes.input}
              name="new_password"
            ></input>
            {response?.new_password && (
              <p style={{ color: "black" }}>{response.new_password}</p>
            )}
            <input
              type="password"
              placeholder="Potwierdź nowe hasło"
              className={classes.input}
              name="new_password2"
            ></input>
            {response?.new_password2 && (
              <p style={{ color: "black" }}>{response.new_password2}</p>
            )}
            {response?.non_field_errors && (
              <p style={{ color: "black" }}>{response.non_field_errors}</p>
            )}
            <LongButton value="changePassword" onClick={() => setLoading(true)}>
              {!loading ? "Zmień hasło" : <LoadingUI />}
            </LongButton>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePassword;
