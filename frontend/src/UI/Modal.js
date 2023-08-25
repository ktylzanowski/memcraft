import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
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

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  if (!modalIsOpen) {
    return null;
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={closeModalHandler} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;