import React, { Component } from "react";

import "./contact-us.styles.scss";

class ContactUsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owned: true,
    };
  }

  render() {
    return (
      <section className="contact-us-page-background">
        <div className="contact-us-page">
          <h1 className="contact-us-title">What can we do for you today?</h1>
          <form action="" method="post" className="contact-us-form">
            {this.state.owned ? (
              <React.Fragment>
                <label className="name">
                  <span className="contact-us-label">Full Name</span>
                  <input type="text" id="name" name="name" required />
                </label>
                <label className="email">
                  <span className="contact-us-label">Email</span>
                  <input type="text" id="email" name="email" required />
                </label>
              </React.Fragment>
            ) : null}
            <label className="reason">
              <span className="contact-us-label">Reason</span>
              <select name="reason" id="reason-select" required>
                <option value="" selected disabled hidden>
                  Select an Option
                </option>
                <option value="troubleshooting-restaurant-management">
                  Troubleshooting Restaurant Management
                </option>
                <option value="troubleshooting-account-management">
                  Troubleshooting Account Management
                </option>
                <option value="bug-report">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="message">
              <span className="contact-us-label">Message</span>
              <textarea
                id="message"
                name="message"
                rows="20"
                required
              ></textarea>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    );
  }
}

export default ContactUsPage;
