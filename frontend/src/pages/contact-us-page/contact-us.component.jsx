/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This class component renders a review input used for users to post a review to a 
  specifc restaurant. It allows users to upload images with their review, and preview these as 
  well. They may post some message in the review, and select a max rating of 5 hearts.
*/

// IMPORT MAIN PACKAGES
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// IMPORT STYLES
import "./contact-us.styles.scss";

// IMPORT COMPONENTS
import ReCAPTCHA from "react-google-recaptcha";
import FormInput from "../../components/form-input/form-input.component";
import SelectInput from "../../components/select-input/select-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Modal from "../../components/modal/modal.component";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";

// Functional Component ContactUsPage
const ContactUsPage = ({ userAuth, currentUser, ...props }) => {
  // Browserhistory manipulates a user's browser history/redirects them to a new page if desired.
  const browserHistory = useHistory();
  // This is a reperence to googles captcha.
  const captcha = React.createRef();

  // These are state variables used to check whether or not the contact us form can be sent and
  // if it has been sent and is now loading. The third variable contains the contents of the form.
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState({
    sender: "",
    name: "",
    subject: "",
    body: "",
  });

  // This function sends the form to the backend, which sends an email to our team 6's gmail
  // account.
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!verified) {
      return;
    }

    if (userAuth) {
      let name = currentUser.fname + " " + currentUser.lname;
      setContents({ ...contents, sender: currentUser.email, name: name });
    }

    await axios
      .post(`${BASE_API_URL}/email`, contents)
      .then(async (res) => {
        setLoading(false);
        browserHistory.push("/");
      })
      .catch((error) => {
        setLoading(false);
        browserHistory.push("/error-page");
      });
  };

  // This function verifies that the captcha fulfillment was a success.
  const verifyCallback = async (token) => {
    await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_CAPTCHA_SECRET_KEY}&response=${token}`
      )
      .then((res) => {
        console.log(res);
        setVerified(res.data.success);
      })
      .catch((error) => console.error(error));
  };

  // This returns the contact us component.
  return (
    // This section is the parent container of the contact us page.
    <section className="contact-us-page-background">
      {/* If the form has been sent, then the loading animation is rendered while it is being 
      processed. */}
      {loading ? (
        <Modal defaultShow backdrop>
          <LoadingAnimation
            text1="Sending Request"
            text2="Please Wait"
          ></LoadingAnimation>
        </Modal>
      ) : null}
      {/* This div is used purely to style the contents of the section. */}
      <div className="contact-us-page">
        <h1 className="contact-us-title">What can we do for you today?</h1>
        <form
          action=""
          method="post"
          className="contact-us-form"
          onSubmit={sendEmail}
        >
          {/* If the user is logged in, then do not display the form input requiring a name and 
          email. If the user is not logged in, then do display the form input requiring a name 
          and email to return to. */}
          {userAuth ? null : (
            <React.Fragment>
              <FormInput
                readOnly={loading}
                type="text"
                htmlFor="sender-name"
                label="sender name"
                value={contents.name}
                required
                handleChange={(e) => {
                  setContents({ ...contents, name: e.target.value });
                }}
              ></FormInput>
              <FormInput
                readOnly={loading}
                type="text"
                htmlFor="sender-email"
                label="sender email"
                value={contents.sender}
                required
                handleChange={(e) => {
                  setContents({ ...contents, sender: e.target.value });
                }}
              ></FormInput>
            </React.Fragment>
          )}
          {/* Require a reason for the contact. */}
          <SelectInput
            disabled={loading}
            required
            label="reason"
            htmlFor="reason"
            value={contents.subject}
            handleChange={(e) => {
              setContents({ ...contents, subject: e.target.value });
            }}
          >
            <option value="troubleshooting restaurant management">
              Troubleshooting Restaurant Management
            </option>
            <option value="troubleshooting account management">
              Troubleshooting Account Management
            </option>
            <option value="bug report">Bug Report</option>
            <option value="other">Other</option>
          </SelectInput>
          {/* Require a message to be sent with the contact form. */}
          <FormInput
            className="textarea-input"
            readOnly={loading}
            required
            type="textarea"
            htmlFor="message"
            label="message"
            value={contents.body}
            handleChange={(e) => {
              setContents({ ...contents, body: e.target.value });
            }}
            maxLength="2000"
          ></FormInput>
          {/* Require a captcha verification to ensure a bot is not spamming the form. */}
          <ReCAPTCHA
            className="captcha"
            ref={captcha}
            size="normal"
            render="explicit"
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={verifyCallback}
          ></ReCAPTCHA>
          <CustomButton disabled={loading || !verified} type="submit" margin>
            Submit
          </CustomButton>
        </form>
        {/* If the captcha has not been verified, then display a message requiring that they fulfill the captcha. */}
        {!verified ? (
          <p className="contact-requirement">
            Please fill out captcha to proceed
          </p>
        ) : null}
      </div>
    </section>
  );
};

// This is a variable used to wrap the functional Contact Us Page component as a higher order
// component to attach user redux variables shared globally. The user redux variables here are
// the logged in user's information. This is so that the form knows whether or not to require an
// email and name.
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

// Attach the redux values as a higher order component to the contact us page and export as the
// default component of Contact Us Page.
export default connect(mapStateToProps)(ContactUsPage);
