import React, { Component } from "react";
import Tab from "./tab/tab.component";

import "./tabs.styles.scss";

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  setTab = (active) => {
    this.setState({ index: active });
  };

  render() {
    const tabs = this.props.labels.map((label, index) => {
      return (
        <Tab
          key={index}
          label={label}
          setTab={this.setTab}
          index={index}
          active={this.state.index === index}
        />
      );
    });

    return this.props.manage ? (
      <div className="tabs">
        <ul>{tabs}</ul>
        {this.props.content[this.state.index]}
      </div>
    ) : (
      <section className="tabs">
        <ul>{tabs}</ul>
        {this.props.content[this.state.index]}
      </section>
    );
  }
}
