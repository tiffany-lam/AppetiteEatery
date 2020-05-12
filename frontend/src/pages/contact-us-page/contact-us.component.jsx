import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import ReCAPTCHA from "react-google-recaptcha";

import FormInput from "../../components/form-input/form-input.component";
import SelectInput from "../../components/select-input/select-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import Modal from "../../components/modal/modal.component";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";

import "./contact-us.styles.scss";

const ContactUsPage = ({ userAuth, currentUser, ...props }) => {
  const browserHistory = useHistory();
  const captcha = React.createRef();

  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState({
    sender: "",
    name: "",
    subject: "",
    body: "",
  });

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
        // browserHistory.push("/");
      })
      .catch((error) => {
        setLoading(false);
        // browserHistory.push("/error-page");
      });
  };

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

  return (
    <section className="contact-us-page-background">
      {/* {loading ? (
        <Modal defaultShow backdrop>
          <LoadingAnimation
            text1="Sending Request"
            text2="Please Wait"
          ></LoadingAnimation>
        </Modal>
      ) : null} */}
      <div className="contact-us-page">
        <h1 className="contact-us-title">What can we do for you today?</h1>
        <form
          action=""
          method="post"
          className="contact-us-form"
          onSubmit={sendEmail}
        >
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
          <SelectInput
            disabled={loading}
            required
            label="reason"
            htmlFor="reason"
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
        {!verified ? (
          <p className="contact-requirement">
            Please fill out captcha to proceed
          </p>
        ) : null}
      </div>
    </section>
  );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(ContactUsPage);
