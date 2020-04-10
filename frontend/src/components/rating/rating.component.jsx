import React, { useState, useEffect } from "react";
import StarsIcon from "@material-ui/icons/Stars";

import "./rating.styles.scss";

const Rating = ({ rating = 0 }) => {
  const MAX_RATING = 5;

  return (
    <div className="rating-container">
      {[...Array(rating)].map((e, i) => (
        <StarsIcon key={i} className="rating-filled" />
      ))}
      {[...Array(MAX_RATING - rating)].map((e, i) => (
        <StarsIcon key={i} className="rating-unfilled" />
      ))}
    </div>
  );
};

export default Rating;

// ///////////////////////////////////////////////////////////////////
// import React from "react";
// import "./ComponentName.styles.scss";

// class ComponentName extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentDidMount() {}

//   customFunction = () => {};

//   render() {
//     return <div></div>;
//   }
// }

// export default ComponentName;
// ///////////////////////////////////////////////////////////////////
