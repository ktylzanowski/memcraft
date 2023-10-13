import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

const Backdrop = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [page] = useState(state ? state.pathname : "/");
  
  const closeModalHandler = () => {
    navigate(page);
  };

  return <div className={classes.backdrop} onClick={closeModalHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <div className={classes.scrollableContent}>{props.children}</div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay>
    </React.Fragment>,
    document.getElementById("overlays")
  );
};

export default Modal;
