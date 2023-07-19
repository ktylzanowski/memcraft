import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={classes.modalMessage}>
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const ModalMessage = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default ModalMessage;
