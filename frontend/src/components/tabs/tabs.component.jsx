/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This functional component renders a tabbing component, which has multiple tabs. 
  For the tab that is currently selected, it will display the associated contents.
*/

// IMPORT MAIN PACKAGES
import React, { Component } from "react";

// IMPORT STYLES
import "./tabs.styles.scss";

// IMPORT COMPONENT
import Tab from "./tab/tab.component";

// Export default class component Tabs
export default class Tabs extends Component {
  // The constructor sets a state that holds an index value which determines which tab is
  // currently selected.
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  // This function sets the current active tab/index.
  setTab = (active) => {
    this.setState({ index: active });
  };

  // Renders tabbing component
  render() {
    // This variable dynamically renders the tab components
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

    // As forms cannot hold divs, if this tabbing system is being used to inside of a form, it
    // renders contained inside of a div.
    return this.props.manage ? (
      <div
        className={
          this.props.className ? `${this.props.className} tabs` : "tabs"
        }
      >
        <ul>{tabs}</ul>
        {this.props.content[this.state.index]}
      </div>
    ) : (
      <section
        className={
          this.props.className ? `${this.props.className} tabs` : "tabs"
        }
      >
        <ul>{tabs}</ul>
        {this.props.content[this.state.index]}
      </section>
    );
  }
}
