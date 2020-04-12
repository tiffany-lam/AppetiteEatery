import React from "react";
import "./mmodal.styles.scss";

class MModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: "ldsjflisejlfi" };
  }

  render() {
    return (
      <div className="mmodal-container">
        <div
          onClick={this.props.toggleLogin}
          // className={`mmodal-killswitch ${
          //   this.state.showModal ? "" : "display-nothing"
          // }`}
          className="mmodal-killswitch"
        ></div>
        <div
          className="my-content"

          // className={`my-content ${
          //   this.state.showModal ? "" : "display-nothing"
          // }`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MModal;
///////////////////////////////////////////////////////////////////
