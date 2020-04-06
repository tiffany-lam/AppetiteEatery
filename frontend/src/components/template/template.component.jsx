///////////////////////////////////////////////////////////////////
import React from "react";
import "./ComponentName.styles.scss";

const ComponentName = () => {
  return <div></div>;
};

export default ComponentName;
///////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import "./ComponentName.styles.scss";

const ComponentName = () => {
  const [varA, setVarA] = useState("");
  const [varB, setVarB] = useState([]);

  useEffect(() => {
    // same as componentDidMount() (not really but sorta; read up on this)
  }, []);

  return <div></div>;
};

export default ComponentName;

///////////////////////////////////////////////////////////////////
import React from "react";
import "./ComponentName.styles.scss";

class ComponentName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  customFunction = () => {};

  render() {
    return <div></div>;
  }
}

export default ComponentName;
///////////////////////////////////////////////////////////////////
