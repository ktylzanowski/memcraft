import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
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

const Modal = (props) => {
  const navigate = useNavigate();

  const closeModalHandler = () => {
    navigate(-1);
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop onClick={closeModalHandler} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </React.Fragment>,
    document.getElementById('overlays')
  );
};

export default Modal;