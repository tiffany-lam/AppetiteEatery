import React, { useState, useEffect } from "react";
import Portal from "../portal/portal.component";

import "./modal.styles.scss";

const Modal = ({
  defaultShow = false,
  children,
  backdrop = false,
  backdropStyle,
  triggerComponent,
  triggerType = "click",
}) => {
  const [show, setShow] = useState(defaultShow);

  useEffect(() => {}, []);

  const toggleModal = () => {
    setShow(!show);
  };

  const closeComponent = () => {
    setShow(false);
  };

  let NewTriggerComponent = null;
  if (React.isValidElement(triggerComponent)) {
    switch (triggerType) {
      case "hover":
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onMouseEnter: toggleModal,
          onClick: toggleModal,
        });
        break;
      default:
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onClick: toggleModal,
        });
    }
  }

  let NewChildrenComponent = null;
  if (React.isValidElement(children)) {
    NewChildrenComponent = React.cloneElement(children, {
      closeComponent: closeComponent,
    });
  }

  return (
    <React.Fragment>
      {NewTriggerComponent}
      <Portal>
        {show ? (
          <div className="modal-container">
            {backdrop ? (
              <div
                onClick={toggleModal}
                style={backdropStyle}
                className={`modal-backdrop`}
              ></div>
            ) : null}
            }<div className="modal-content">{NewChildrenComponent}</div>
          </div>
        ) : (
          ""
        )}
      </Portal>
    </React.Fragment>
  );
};

export default Modal;
