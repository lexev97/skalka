import React from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";

import "./_Modal.scss";

const Backdrop = (props) => {
  return (
    <div className={`backdrop ${props.slowOpacity}`} onClick={props.onClose}>
      {props.children}
    </div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div
      className={`modal ${props.className}`}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {props.children}
    </div>
  );
};

const portalItem = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop slowOpacity={props.slowOpacity} onClose={props.onClose}>
          <ModalOverlay className={props.className}>
            {props.children}
          </ModalOverlay>
        </Backdrop>,
        portalItem
      )}
    </Fragment>
  );
};

export default Modal;
