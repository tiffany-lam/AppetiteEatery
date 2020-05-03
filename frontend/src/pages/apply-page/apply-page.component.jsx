// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageUploadInput from "../../components/img-upload-input/img-upload-inputcomponent";
import SelectInput from "../../components/select-input/select-input.component";
import HourRangeInput from "../../components/hour-range-input/hour-range.component";

// custom stylesheet:
import "./apply-page.styles.scss";

const ApplyPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [country, setCountry] = useState("USA");
  const [location, setLocation] = useState([152.5, 152.5]);

  const [tags, setTags] = useState(["sdf", "hey tag here"]);
  const [images, setImages] = useState([]);
  const [menus, setMenus] = useState([]);

  const [details, setDetails] = useState({
    parking: "",
    reservation: false,
    petsAllowed: false,
    takeout: false,
    wifi: false,
    waitTime: "",
  });

  const [hours, setHours] = useState({
    sunday: { to: "", from: "" },
    monday: { to: "", from: "" },
    tuesday: { to: "", from: "" },
    wednesday: { to: "", from: "" },
    thursday: { to: "", from: "" },
    friday: { to: "", from: "" },
    saturday: { to: "", from: "" },
  });

  const submitForm = async (e) => {
    console.log("submitted");

    e.preventDefault();
    const textData = {
      ownerid: "5ead3201520a017539dfa306",
      // owner: userAuth.uid,
      website: "http://www.website.com",

      restaurantName,
      description,
      dateOpen: dateOpened,
      address: address1,
      address2,
      city,
      state,
      zipcode,
      country,
      location,
      restaurantTags: tags,
      details,
      hours,
    };

    axios
      .post(`http://127.0.0.1:5000/api/restaurant`, textData)
      .then((res) => {
        console.log("SUBMITTEEEEEEDD");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(textData);
        console.error(err);
      });
  };

  return (
    <div className="apply-page-container">
      <h1 className="apply-form-header input-override">
        Submit your restaurant!
      </h1>

      <form onSubmit={submitForm}>
        <h2 className="form-subtitle">Basic Information</h2>
        <FormInput
          required
          type="text"
          htmlFor="restaurant-name"
          label="restaurant name"
          value={restaurantName}
          handleChange={(e) => {
            setRestaurantName(e.target.value);
          }}
          className="input-override"
        />

        <FormInput
          required
          type="date"
          htmlFor="date-created"
          label="date opened"
          value={dateOpened}
          handleChange={(e) => {
            setDateOpened(e.target.value);
          }}
          className="input-override"
        />

        <FormInput
          required
          type="textarea"
          htmlFor="restaurant-description"
          label="description"
          value={description}
          handleChange={(e) => {
            setDescription(e.target.value);
          }}
          className="input-override"
          maxLength="500"
          additionalInfo="(max length: 500 characters)"
        />

        <h2 className="form-subtitle">Address</h2>
        <FormInput
          required
          type="text"
          htmlFor="street-address"
          label="Street Address"
          value={address1}
          handleChange={(e) => {
            setAddress1(e.target.value);
          }}
          className="input-override"
        />

        <FormInput
          type="text"
          htmlFor="street-address-2"
          label="Street Address 2"
          value={address2}
          handleChange={(e) => {
            setAddress2(e.target.value);
          }}
          className="input-override"
          additionalInfo="(optional)"
        />

        <div className="city-state-zip-container">
          <FormInput
            required
            type="text"
            htmlFor="city"
            label="city"
            value={city}
            handleChange={(e) => {
              setCity(e.target.value);
            }}
            className="input-override"
            id="city-input"
          />

          <FormInput
            required
            type="text"
            htmlFor="state"
            label="state"
            value={state}
            handleChange={(e) => {
              setState(e.target.value);
            }}
            className="input-override"
            id="state-input"
          />

          <FormInput
            required
            type="text" // not number because zipcodes are best treated as strings
            htmlFor="zipcode"
            label="zip code"
            value={zipcode}
            handleChange={(e) => {
              setZipCode(e.target.value);
            }}
            className="input-override"
            id="zipcode-input"
            pattern="^\d{5}(?:[-]\d{4})?$"
          />
        </div>

        <FormInput
          // required
          readOnly
          type="text"
          htmlFor="country"
          label="country"
          value={country}
          handleChange={(e) => {
            setCountry(e.target.value);
          }}
          className="input-override"
        />
        <h2 className="form-subtitle">Images</h2>

        <ImageUploadInput
          label="Restaurant Images"
          htmlFor="restaurant-images"
          value={images}
          handleChange={setImages}
          additionalInfo=""
          className="input-override"
        />

        <ImageUploadInput
          label="Menu Images"
          htmlFor="menu-images"
          value={menus}
          handleChange={setMenus}
          additionalInfo=""
          className="input-override"
        />

        <h2
          className="form-subtitle"
          onClick={() => {
            console.log(details);
          }}
        >
          Details
        </h2>

        <SelectInput
          required
          label="parking"
          htmlFor="parking"
          className="input-override"
          handleChange={(e) => {
            setDetails({ ...details, parking: e.target.value });
          }}
        >
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
          <option value="Unavailable">Unavailable</option>
        </SelectInput>

        <SelectInput
          required
          label="reservation"
          htmlFor="reservation"
          className="input-override"
          handleChange={(e) => {
            setDetails({ ...details, reservation: e.target.value });
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <SelectInput
          required
          label="pets allowed"
          htmlFor="pets-allowed"
          className="input-override"
          handleChange={(e) => {
            setDetails({ ...details, petsAllowed: e.target.value });
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <SelectInput
          required
          label="takeout"
          htmlFor="takeout"
          className="input-override"
          handleChange={(e) => {
            setDetails({ ...details, takeout: e.target.value });
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <SelectInput
          required
          label="wifi"
          htmlFor="wifi"
          className="input-override"
          handleChange={(e) => {
            setDetails({ ...details, wifi: e.target.value });
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <FormInput
          required
          type="number"
          htmlFor="wait-time"
          label="wait time"
          value={details.waitTime}
          handleChange={(e) => {
            setDetails({ ...details, waitTime: e.target.value });
          }}
          className="input-override"
          min="1"
          additionalInfo="(in hrs)"
        />

        <h2
          id="hours-header"
          className="form-subtitle"
          onClick={() => {
            console.log(hours);
          }}
        >
          Hours
        </h2>

        <HourRangeInput
          label="sunday"
          className="time-range-input"
          value2={hours.sunday.to}
          value1={hours.sunday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              sunday: { from: hours.sunday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              sunday: { to: hours.sunday.to, from: e.target.value },
            });
          }}
        />

        <HourRangeInput
          label="monday"
          className="time-range-input"
          value2={hours.monday.to}
          value1={hours.monday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              monday: { from: hours.monday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              monday: { to: hours.monday.to, from: e.target.value },
            });
          }}
        />
        <HourRangeInput
          label="tuesday"
          className="time-range-input"
          value2={hours.tuesday.to}
          value1={hours.tuesday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              tuesday: { from: hours.tuesday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              tuesday: { to: hours.tuesday.to, from: e.target.value },
            });
          }}
        />
        <HourRangeInput
          label="wednesday"
          className="time-range-input"
          value2={hours.wednesday.to}
          value1={hours.wednesday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              wednesday: { from: hours.wednesday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              wednesday: { to: hours.wednesday.to, from: e.target.value },
            });
          }}
        />
        <HourRangeInput
          label="thursday"
          className="time-range-input"
          value2={hours.thursday.to}
          value1={hours.thursday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              thursday: { from: hours.thursday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              thursday: { to: hours.thursday.to, from: e.target.value },
            });
          }}
        />
        <HourRangeInput
          label="friday"
          className="time-range-input"
          value2={hours.friday.to}
          value1={hours.friday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              friday: { from: hours.friday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              friday: { to: hours.friday.to, from: e.target.value },
            });
          }}
        />
        <HourRangeInput
          label="saturday"
          className="time-range-input"
          value2={hours.saturday.to}
          value1={hours.saturday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              saturday: { from: hours.saturday.from, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              saturday: { to: hours.saturday.to, from: e.target.value },
            });
          }}
        />

        <h2 className="form-subtitle">Tags</h2>

        <CustomButton type="submit" className="input-override" margin>
          submit
        </CustomButton>
      </form>
    </div>
  );
};

export default ApplyPage;
