/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a modal with a backdrop.
*/

// main packages:
import React, { useState, useEffect } from "react";

// custom components:
import Portal from "../portal/portal.component";

// custom stylesheets:
import "./modal.styles.scss";

// returns a modal component with a backdrop with a toggle-able component
const Modal = ({
  defaultShow = false,
  children,
  backdrop = false,
  backdropStyle,
  triggerComponent,
  triggerType = "click",
}) => {
  // state variable determining if the modal is currently being show or not
  const [show, setShow] = useState(defaultShow);

  useEffect(() => {}, []);

  // function toggles component by setting state variable opposite to its value
  const toggleModal = () => {
    setShow(!show);
  };

  // function closes component by setting state variable show to false
  const closeComponent = () => {
    setShow(false);
  };

  let NewTriggerComponent = null;

  // if the trigger component is a valid element...
  if (React.isValidElement(triggerComponent)) {
    switch (triggerType) {
      // if the trigger type is hover, then clone the trigger component to use onMouseEnter to
      // triger modal toggle
      case "hover":
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onMouseEnter: toggleModal,
          onClick: toggleModal,
        });
        break;
      // else leave the default trigger type as click and clone the component with an onClick
      // prop that toggles the modal
      default:
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onClick: toggleModal,
        });
    }
  }

  let NewChildrenComponent = null;

  // if all children compoents are valid react elements, clone them and attach the close
  // component function as a prop
  if (React.isValidElement(children)) {
    NewChildrenComponent = React.cloneElement(children, {
      closeComponent: closeComponent,
    });
  }

  // return the modal component with the desired trigger component and children components
  return (
    <React.Fragment>
      {NewTriggerComponent}
      <Portal>
        {/* if show is true, show the cloned children component with the attached close component 
        function, else do not display */}
        {show ? (
          <div className="modal-container">
            {/* if true, display a backdrop, else do not display a backdrop */}
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
