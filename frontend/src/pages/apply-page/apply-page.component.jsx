// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("USA");

  const [tags, setTags] = useState([]);
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
    sundayTo: "",
    sundayFrom: "",
    mondayTo: "",
    mondayFrom: "",

    tuesdayTo: "",
    tuesdayFrom: "",

    wednesdayTo: "",
    wednesdayFrom: "",

    thursdayTo: "",
    thursdayFrom: "",

    fridayTo: "",
    fridayFrom: "",
    saturdayTo: "",
    saturdayFrom: "",
  });

  return (
    <div className="apply-page-container">
      <h1 className="apply-form-header input-override">
        Submit your restaurant!
      </h1>

      <form action="">
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
            value={zipCode}
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

        <h2 className="form-subtitle">Details</h2>

        <SelectInput
          required
          label="parking"
          htmlFor="parking"
          className="input-override"
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="unavailable">Unavailable</option>
        </SelectInput>

        <SelectInput
          required
          label="reservation"
          htmlFor="reservation"
          className="input-override"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <SelectInput
          required
          label="pets allowed"
          htmlFor="pets-allowed"
          className="input-override"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <SelectInput
          required
          label="takeout"
          htmlFor="takeout"
          className="input-override"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </SelectInput>

        <SelectInput
          required
          label="wifi"
          htmlFor="wifi"
          className="input-override"
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
          value1={hours.sundayTo}
          value2={hours.sundayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, sundayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, sundayFrom: e.target.value });
          }}
        />

        <HourRangeInput
          label="monday"
          className="time-range-input"
          value1={hours.mondayTo}
          value2={hours.mondayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, mondayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, mondayFrom: e.target.value });
          }}
        />
        <HourRangeInput
          label="tuesday"
          className="time-range-input"
          value1={hours.tuesdayTo}
          value2={hours.tuesdayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, tuesdayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, tuesdayFrom: e.target.value });
          }}
        />
        <HourRangeInput
          label="wednesday"
          className="time-range-input"
          value1={hours.wednesdayTo}
          value2={hours.wednesdayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, wednesdayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, wednesdayFrom: e.target.value });
          }}
        />
        <HourRangeInput
          label="thursday"
          className="time-range-input"
          value1={hours.thursdayTo}
          value2={hours.thursdayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, thursdayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, thursdayFrom: e.target.value });
          }}
        />
        <HourRangeInput
          label="friday"
          className="time-range-input"
          value1={hours.fridayTo}
          value2={hours.fridayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, fridayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, fridayFrom: e.target.value });
          }}
        />
        <HourRangeInput
          label="saturday"
          className="time-range-input"
          value1={hours.saturdayTo}
          value2={hours.saturdayFrom}
          handleChange1={(e) => {
            setHours({ ...hours, saturdayTo: e.target.value });
          }}
          handleChange2={(e) => {
            setHours({ ...hours, saturdayFrom: e.target.value });
          }}
        />

        <h2 className="form-subtitle">Tags</h2>

        <CustomButton className="input-override" margin>
          submit
        </CustomButton>
      </form>
    </div>
  );
};

export default ApplyPage;
