/*
  Contributors: Julie Do 014101748, Tiffany Lam 015181853, Veronica Sumariyanto 013229149, Sam Alhaqab 017018649
  Course: CECS 470

  Description: This class component renders a review input used for users to post a review to a 
  specifc restaurant. It allows users to upload images with their review, and preview these as 
  well. They may post some message in the review, and select a max rating of 5 hearts.

  Current Bugs: Hover effect may glitch if user cursor is on the edge of the component page component.
*/

// IMPORT MAIN PACKAGES
import React, { useState, useEffect } from "react";

// IMPORT STYLES
import "./about-us.styles.scss";

// IMPORT ICONS
import DoneIcon from "@material-ui/icons/Done";

// Functional Component About Us Page
const AboutUsPage = (props) => {
  // This returns the about us page and all of its contents.
  return (
    // This is the parent container for the about us page.
    <section className="about-us-container">
      {/* This is the heading title of the page. */}
      <h1>About Us</h1>
      {/* This div is used purely to style the about-us contents. */}
      <div className="about-us">
        {/* This section contains the design and development description of our website. */}
        <section className="about-us-design">
          <h2>Design & Development</h2>
          <p>
            Welcome to Appetite Eatery! Appetite Eatery is a project pioneered
            for the course CECS 470 by team six, a group of student developers:
            Sam Alhaqab, Julie Do, Tiffany Lam, and Veronica Sumariyanto. The
            goal behind this website is to provide exposure to smaller, niche
            restaurants. Popular food searching restaurants tend to overlook
            smaller, less reviewed restaurants in favor of the popular trendy
            restaurants. This makes it difficult for new or small restaurants to
            expand. However, in Appetite Eatery, the focus highlights these
            smaller restaurants and allows users to search for and try new
            flavors at the local hidden gem!
          </p>
        </section>
        {/* This section contains all the sections about each of our individual developers and 
        their responsibilities. */}
        <section className="about-us-developers">
          <h2>Developers</h2>
          {/* This section is for Sam Alhaqab. */}
          <section className="about-us-sam">
            <h3>Sam Alhaqab</h3>
            <hr></hr>
            {/* This h4 and list are used to bullet point the responsibilities. */}
            <h4>Responsibilities</h4>
            <ul>
              <li>
                <DoneIcon></DoneIcon>
                <p>Navigational Bars</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Home & Apply Pages</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Frontend Structure & Layout</p>
              </li>
            </ul>
            {/* This paragraph is to give a more descriptive explanation of the aforementioned 
            responsibilities. */}
            <p>
              My name is Sam Alhaqab and I am one of the developers behind this
              project, otherwise known as Appetite Eatery! As a core member of
              our development team, my responsibilities included providing a
              modular, well-structured, and semantic foundation for our
              React-based frontend. This includes implementation of the latest
              modern web development designs integrated throughout our pages. As
              main components of our website, our navigational header and footer
              bars set up a template for all of our pages as well as an
              intuitive manner of navigation for all our users.
            </p>
          </section>
          {/* This section is for Julie Do. */}
          <section className="about-us-julie">
            <h3>Julie Do</h3>
            <hr></hr>
            {/* This h4 and list are used to bullet point the responsibilities. */}
            <h4>Responsibilities</h4>
            <ul>
              <li>
                <DoneIcon></DoneIcon>
                <p>Server Management</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Restaurant, Contact & About Pages</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Backend Structure & Layout</p>
              </li>
            </ul>
            {/* This paragraph is to give a more descriptive explanation of the aforementioned 
            responsibilities. */}
            <p>
              I'm Julie Do, a member of the development team behind this
              project, Appetite Eatery! My duties included setting up the
              backend to serve our frontend through Flask on an apache server.
              Our project utilizes RESTful API endpoints to serve data through
              our webpages to our clients, therefore the backend has a layout
              intended to provide information via such endpoints. Beyond the
              backend, I also developed the restaurant page, contact us page,
              and the about us page, so check them out if you're interested.
            </p>
          </section>
          {/* This section is for Tiffany lam. */}
          <section className="about-us-tiffany">
            <h3>Tiffany Lam</h3>
            <hr></hr>
            {/* This h4 and list are used to bullet point the responsibilities. */}
            <h4>Responsibilities</h4>
            <ul>
              <li>
                <DoneIcon></DoneIcon>
                <p>Login & Authentication</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Restaurant Search</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Database Architecture</p>
              </li>
            </ul>
            {/* This paragraph is to give a more descriptive explanation of the aforementioned 
            responsibilities. */}
            <p>
              My name is Tiffany Lam, and I'm part of the team behind Appetite
              Eatery. As part of the team, I set up authentication for users and
              developed the main architecture behind our database. I also set up
              the restaurant search and sort, a vital feature of our website.
            </p>
          </section>
          {/* This section is for Veronica Sumariyanto. */}
          <section className="about-us-veronica">
            <h3>Veronica Sumariyanto</h3>
            <hr></hr>
            {/* This h4 and list are used to bullet point the responsibilities. */}
            <h4>Responsibilities</h4>
            <ul>
              <li>
                <DoneIcon></DoneIcon>
                <p>Profile Page</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>User Information Modification</p>
              </li>
              <li>
                <DoneIcon></DoneIcon>
                <p>Database Information Population</p>
              </li>
            </ul>
            {/* This paragraph is to give a more descriptive explanation of the aforementioned 
            responsibilities. */}
            <p>
              Hi, I'm Veronica Sumariyanto, one of the developers behind
              Appetite Eatery. As a team member, my responsibilities including
              setting up the profile page for our users, allowing them to view
              and modify their own information! This includes any reviews that
              they may have. I also populated our database with relevant
              information necessary to our development.
            </p>
          </section>
        </section>
      </div>
    </section>
  );
};

export default AboutUsPage;
