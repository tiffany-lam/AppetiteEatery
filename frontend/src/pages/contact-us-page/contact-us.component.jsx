import React, { Component } from "react";

import "./contact-us.styles.scss";

class ContactUsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="contact-us-page-background">
        <div className="contact-us-page">
          <h1 className="contact-us-title">What can we do for you today?</h1>
          <form action="" method="post" className="contact-us-form">
            <label className="reason">
              <span className="contact-us-label">Reason</span>
              <select name="reason" id="reason-select">
                <option value="none" selected disabled hidden>
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
              <textarea id="message" name="message" rows="20"></textarea>
            </label>
            <input type="submit" value="Submit" className="submit" />
          </form>
        </div>
      </section>
    );
  }
}

export default ContactUsPage;
