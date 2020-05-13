/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This component is to mimic the functionality of a premade modal the contents of the modal will be created from another compoenent and will become the child of THIS custom modal. 
*/

// main packages:
import React from "react";

// custom stylesheets:
import "./custom-modal.styles.scss";

// returns custom model
class CustomModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // behind-modal-container is the div that holds the modal itself, aka the div BEHIND the popup modal
      <div className="behind-modal-container">
        {/* close-modal-area is the div that will be used to handle an onClick and close the modal when the user clicks outside of it */}
        <div
          className="close-modal-area"
          onClick={this.props.toggleModal}
        ></div>
        {/* modal-popup-box is the div that will hold the content of whatever we want to show inside our modal */}
        <div className="modal-popup-box">
          <div className="content-container">
            {/* we will pass in the children from our navbar, aka the component that gets passed in will get rendered in this component */}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomModal;
