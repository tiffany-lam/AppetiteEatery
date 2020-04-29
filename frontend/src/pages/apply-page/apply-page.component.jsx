// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageUploadInput from "../../components/img-upload-input/img-upload-inputcomponent";
import SelectInput from "../../components/select-input/select-input.component";

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
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
  });

  const manageImageList = (e) => {
    // e.target.files;
    // setImages([...images, e.target.value]);
    console.log(e.target.files);
    // console.log(URL.createObjectURL(e.target.files));
    // console.log(images);
    // let newImageList = [];

    // for (let i = 0; i < e.target.files.length; i++) {
    //   newImageList.push(e.target.files[i]);
    // }

    // console.log(newImageList);
    // setImages(newImageList);
    // console.log(images);

    setImages([...images, ...Array.from(e.target.files)]);
  };

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
        <h2 className="form-subtitle">Hours</h2>

        <FormInput
          required
          type="time"
          htmlFor="sunday-hours"
          label="sunday"
          value={hours.sunday}
          handleChange={(e) => {
            setHours({ ...hours, sunday: e.target.value });
          }}
          className="input-override hour-input"
        />

        <FormInput
          required
          type="time"
          htmlFor="monday-hours"
          label="monday"
          value={hours.monday}
          handleChange={(e) => {
            setHours({ ...hours, monday: e.target.value });
          }}
          className="input-override hour-input"
        />

        <FormInput
          required
          type="time"
          htmlFor="tuesday-hours"
          label="tuesday"
          value={hours.tuesday}
          handleChange={(e) => {
            setHours({ ...hours, tuesday: e.target.value });
          }}
          className="input-override hour-input"
        />

        <FormInput
          required
          type="time"
          htmlFor="wednesday-hours"
          label="wednesday"
          value={hours.wednesday}
          handleChange={(e) => {
            setHours({ ...hours, wednesday: e.target.value });
          }}
          className="input-override hour-input"
        />

        <FormInput
          required
          type="time"
          htmlFor="thursday-hours"
          label="thursday"
          value={hours.thursday}
          handleChange={(e) => {
            setHours({ ...hours, thursday: e.target.value });
          }}
          className="input-override hour-input"
        />

        <FormInput
          required
          type="time"
          htmlFor="friday-hours"
          label="friday"
          value={hours.friday}
          handleChange={(e) => {
            setHours({ ...hours, friday: e.target.value });
          }}
          className="input-override hour-input"
        />

        <FormInput
          required
          type="time"
          htmlFor="saturday-hours"
          label="saturday"
          value={hours.saturday}
          handleChange={(e) => {
            setHours({ ...hours, saturday: e.target.value });
          }}
          className="input-override hour-input"
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
