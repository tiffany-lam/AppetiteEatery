import React from "react";
import "./mmodal.styles.scss";

class MModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
  }

  // componentDidMount() {}

  customFunction = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div className="mmodal-container">
        <div
          onClick={this.customFunction}
          className={`mmodal-killswitch ${
            this.state.showModal ? "" : "display-nothing"
          }`}
        ></div>
        <div
          className={`my-content ${
            this.state.showModal ? "" : "display-nothing"
          }`}
        >
          actualsdfdsf content
        </div>
      </div>
    );
  }
}

export default MModal;
///////////////////////////////////////////////////////////////////
