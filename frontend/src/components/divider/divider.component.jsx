import React from "react";
import "./divider.styles.scss";

const Divider = (props) => {
  return (
    <React.Fragment>
      <hr className={props.full ? "divider-full" : "divider-edge"} />
    </React.Fragment>
  );
};

export default Divider;
