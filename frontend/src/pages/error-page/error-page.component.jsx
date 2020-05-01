// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

// custom components:
import Rating from "../../components/rating/rating.component";

// icons:
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoyaltyIcon from "@material-ui/icons/Loyalty";

// custom stylesheet:
import "./error-page.styles.scss";

const ErrorPage = ({ match }) => {
  const [rating, setRating] = useState(0);

  const test = async (e) => {
    e.preventDefault(); 
    console.log("called");

    let testobj = {
      tester: "tester",
      testerarray: ["tester1", "tester2", "tester3"],
      testernested: {
        testernested1: "testernested1",
        testernested2: "testernested2"
      }
    };

    let restaurant = {
      "restaurantName": "JsonTest",
      "restaurantTags": ["JsonTestTag1", "JsonTestTag2"],
      "description": "JsonTestDescription",
      "dateOpen": "2018-02-02",
      "ownerid": "5ea696d274e29c25b8fd9c1e",
      "address": "12345 JsonTestAddr Ave.",
      "city": "testcity",
      "zipcode": "12345",
      "state": "CA",
      "location": [0.0, 0.0],
      "hours": {
        "sunday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        },
        "monday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        },
        "tuesday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        },
        "wednesday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        },
        "thursday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        },
        "friday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        },
        "saturday": {
          "from": "10:00 AM",
          "to": "11:00 PM"
        }
      },
      "details": {
        "parking": "Free",
        "reservation": false,
        "petsAllowed": false,
        "takeout": false,
        "wifi": false,
        "waitTime": "10 Minutes"
      },
      "website": "http://wwww.jsontest.com",
      "menu": ["http://wwww.jsontestmenu1.com", "http://wwww.jsontestmenu2.com"],
      "images": ["http://wwww.jsontestimage1.com", "http://www.jsontestimage2.com"]
    }

    // await axios.post("http://127.0.0.1:5000/fronttest?testquery=testquerykey", testobj)
    //             .then(async (response) => {
    //               console.log("returned");
    //               console.log(response);
    //             }).catch(error => { console.log(error) });

    // await axios.put("http://127.0.0.1:5000/api/George?name=NewGeorge")
    //           .then(async (response) => {
    //             console.log("returned");
    //             console.log(response);
    //           }).catch(error => { console.log(error) });

    // await axios.post("http://127.0.0.1:5000/api/restaurant", restaurant)
    //            .then(res => {   console.log("sent and received!");
    //                             console.log(res); })
    //             .catch(error => console.log(error));

    await axios.put("http://127.0.0.1:5000/api/restaurant/5ea9edec69d64b4f70628fea?restaurantName=JsonTestNewNew")
               .then(res => {
                 console.log("sent and retrieved");
                 console.log(res);
               }).catch(error => console.log(error));
  }

  return (
    <div className="error-page-container">
      <h1>404 NOT FOUND</h1>
      <p>This page does not exist.</p>
      <p>Are you lost sweet summer child?</p>
      <Rating input setRating={setRating} />
      ~
      <Rating vertical maxRating={9} />
      ~
      <Rating rating={3} />
      ~
      <Rating input icon={<FavoriteIcon />} setRating={setRating} />
      ~
      <Rating
        input
        vertical
        icon={<LoyaltyIcon />}
        setRating={setRating}
        maxRating={13}
      />
      {console.log(rating)}
      <form action="http://127.0.0.1:5000/fronttest" method="POST" onSubmit={test}>
        <label for="tester">tester</label>
        <input name="tester" id="tester" value="tester"/>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default ErrorPage;
