import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

const Backdrop = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const closeModalHandler = () => {
    navigate(page);
  };

  useEffect(() => {
    setPage(page - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.history.length]);

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
