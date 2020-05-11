import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

import FormInput from "../../components/form-input/form-input.component";
import SelectInput from "../../components/select-input/select-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import Modal from "../../components/modal/modal.component";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";

import "./contact-us.styles.scss";

const ContactUsPage = ({ userAuth, currentUser, ...props }) => {
  const browserHistory = useHistory();

  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState({
    sender: "",
    name: "",
    subject: "",
    body: "",
  });

  const sendEmail = async (e) => {};

  return (
    <section className="contact-us-page-background">
      {loading ? (
        <Modal defaultShow backdrop>
          <LoadingAnimation
            text1="Sending Request"
            text2="Please Wait"
          ></LoadingAnimation>
        </Modal>
      ) : null}
      <div className="contact-us-page">
        <h1 className="contact-us-title">What can we do for you today?</h1>
        <form action="" method="post" className="contact-us-form">
          {userAuth ? null : (
            <React.Fragment>
              <FormInput
                className="form-inputs"
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
                className="form-inputs"
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
            className="form-inputs"
            diasbled={loading}
            required
            label="reason"
            htmlFor="reason"
            handleChange={(e) => {
              setContents({ ...contents, subject: e.target.value });
            }}
          >
            <option value="" selected disabled hidden>
              Select an Option
            </option>
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
            className="form-inputs"
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
          <CustomButton disabled={loading} type="submit" margin>
            Submit
          </CustomButton>
        </form>
        <button
          type="button"
          onClick={(e) => {
            console.log(contents);
            console.log(currentUser);
            console.log(userAuth);
          }}
        >
          ME
        </button>
      </div>
    </section>
  );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(ContactUsPage);
