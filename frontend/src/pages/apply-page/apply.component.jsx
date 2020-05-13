/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component renders an apply page. The page contains a form with 
  inputs that allow a user to create a new restaurant. These inputs include such things as the 
  restaurant name, restaurant description, restaurant tags, images, menu, and other details. 
  Submitting this form will create a new restaurant under the logged in owner. This page can only 
  be viewed by users registered as an owner.
*/

// main packages:
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// custom components:
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageUploadInput from "../../components/img-upload-input/img-upload-inputcomponent";
import SelectInput from "../../components/select-input/select-input.component";
import HourRangeInput from "../../components/hour-range-input/hour-range.component";
import AddTagInput from "../../components/add-tag-input/add-tag-input.component";
import Modal from "../../components/modal/modal.component";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";
import ReCAPTCHA from "react-google-recaptcha";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

// custom stylesheet:
import "./apply-page.styles.scss";

// state abbreviations provided by usps:
// https://about.usps.com/who-we-are/postal-history/state-abbreviations.htm
const stateAbbreviations = [
  "al",
  "ak",
  "az",
  "ar",
  "ca",
  "co",
  "ct",
  "de",
  "dc",
  "fl",
  "ga",
  "hi",
  "id",
  "il",
  "in",
  "ia",
  "ks",
  "ky",
  "la",
  "me",
  "md",
  "ma",
  "mi",
  "mn",
  "ms",
  "mo",
  "mt",
  "nb",
  "nv",
  "nh",
  "nj",
  "nm",
  "ny",
  "nc",
  "nd",
  "oh",
  "ok",
  "or",
  "pa",
  "pr",
  "ri",
  "sc",
  "sd",
  "tn",
  "tx",
  "ut",
  "vt",
  "va",
  "wa",
  "wv",
  "wi",
  "wy",
];

// functional component renders the apply page with associated inputs to create a new restaurant
const ApplyPage = ({ userAuth, ...props }) => {
  // constant variable used to redirect user to a new page once form is submitting
  const browserHistory = useHistory();

  // reperence to captcha
  // const captcha = React.createRef();

  // state variable used to check if page is loading during restaurant submit
  const [loading, setLoading] = useState(false);

  // state variable used to check if captcha has been verified as a success
  // const [verified, setVerified] = useState(false);

  // state variables containing values used to create a restaurant
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [website, setWebsite] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [country, setCountry] = useState("USA");
  const [location, setLocation] = useState([152.5, 152.5]);

  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [menus, setMenus] = useState([]);

  const [details, setDetails] = useState({
    parking: "",
    reservation: "",
    petsAllowed: "",
    takeout: "",
    wifi: "",
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

  // find location of address as latitude and longitude
  const findLocationInfo = async () => {
    const addressStr = `${address1}, ${city}, ${state} ${zipcode}, ${country}`;

    let geoCode = await geocodeByAddress(addressStr);
    let results = await getLatLng(geoCode[0]);

    return results;
  };

  // function takes restaurant information and submits it to create a new restaurant
  // if the submitting of the restaurant is successful, the user is redirected to their
  // list of restaurants
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // if (!verified) {
    //   return;
    // }

    let locationUnformatted = findLocationInfo();

    const textData = {
      ownerid: userAuth.uid,
      website,
      restaurantName,
      description,
      dateOpen: dateOpened,
      address: address1,
      address2,
      city,
      state,
      zipcode,
      country,
      location: [
        (await locationUnformatted).lat,
        (await locationUnformatted).lng,
      ],
      restaurantTags: tags.filter((tag) => {
        return tag !== "" ? tag : null;
      }),
      details,
      hours,
    };

    axios
      .post(`${BASE_API_URL}/restaurant`, textData)
      .then((res) => {
        submitImages(res.data._id.$oid);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // submit images uploads images to associated with the restaurant to an S3 Bucket
  const submitImages = async (restaurantId) => {
    let formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }

    for (let i = 0; i < menus.length; i++) {
      formData.append("menu[]", menus[i]);
    }

    let res = await axios.post(
      `${BASE_API_URL}/restaurant/img-upload/${restaurantId}`,
      formData
    );
    setLoading(false);

    browserHistory.push("/my-restaurants");

    return res;
  };

  // auto populates address/location forms based on suggested address
  const handleSelect = async (addressStr) => {
    const results = await geocodeByAddress(addressStr);
    const addressSegments = results[0].formatted_address.split(",");
    setAddress1(addressSegments[0].trim());
    setCity(addressSegments[1].trim());
    setState(addressSegments[2].trim().split(" ")[0].trim().toLowerCase());
    setZipCode(addressSegments[2].trim().split(" ")[1].trim());
  };

  // This function verifies that the captcha fulfillment was a success.
  // const verifyCallback = async (token) => {
  //   await axios
  //     .post(
  //       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_CAPTCHA_SECRET_KEY}&response=${token}`
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setVerified(res.data.success);
  //     })
  //     .catch((error) => console.error(error));
  // };

  // returns the apply page with required forms to submit restaurant
  return (
    // section contains the apply page html
    <section className="apply-page-container">
      {/* if the restaurant has been submitted, a loading page will display */}
      {loading ? (
        <Modal defaultShow backdrop>
          <LoadingAnimation text1="Uploading Images" text2="Please Wait" />
        </Modal>
      ) : null}

      {/* page title */}
      <h1 className="apply-form-header input-override">
        Submit your restaurant!
      </h1>

      {/* form to submit a restaurant */}
      <form onSubmit={submitForm}>
        <h2 className="form-subtitle">Basic Information</h2>
        {/* text input for restaurant name */}
        <FormInput
          readOnly={loading}
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

        {/* date input for the date the restaurant was opened */}
        <FormInput
          readOnly={loading}
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

        {/* text input for restaurant website */}
        <FormInput
          readOnly={loading}
          type="text"
          htmlFor="website"
          label="website"
          value={website}
          handleChange={(e) => {
            setWebsite(e.target.value);
          }}
          className="input-override"
        />

        {/* text area for restaurant description */}
        <FormInput
          readOnly={loading}
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

        <h2 className="form-subtitle" onClick={findLocationInfo}>
          Address
        </h2>

        {/* auto completes address form */}
        <PlacesAutocomplete
          value={address1}
          onChange={setAddress1}
          onSelect={handleSelect}
          searchOptions={{
            componentRestrictions: { country: ["us"] },
            types: ["address"],
          }}
        >
          {/* render prop function, these props are from the packageL react-places-autocomplete  */}
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <React.Fragment>
              {/* text input for main street address */}
              <FormInput
                readOnly={loading}
                required
                type="text"
                htmlFor="street-address"
                label="Street Address"
                autoCompleteProps={getInputProps()}
              ></FormInput>

              <div className="dropdown-anchor">
                <ul className="street-add-suggestion-dropdown">
                  {loading ? <div>Loading..</div> : null}

                  {suggestions.map((suggestion) => {
                    return (
                      <li {...getSuggestionItemProps(suggestion)}>
                        {suggestion.description}
                        {/* {console.log(suggestion.description)} */}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </React.Fragment>
          )}
        </PlacesAutocomplete>

        {/* text input for secondary street address */}
        <FormInput
          readOnly={loading}
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

        {/* section containg city, state, and zipcode inputs */}
        <section className="city-state-zip-container">
          {/* text input for city */}
          <FormInput
            readOnly={loading}
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

          {/* select input for state */}
          <SelectInput
            disabled={loading}
            required
            value={state}
            label="state"
            htmlFor="state"
            handleChange={(e) => {
              setState(e.target.value);
            }}
            className="input-override"
            id="state-input"
          >
            {stateAbbreviations.map((state, i) => (
              <option key={i} value={state}>
                {state.toUpperCase()}
              </option>
            ))}
          </SelectInput>

          {/* text input for zipcode */}
          <FormInput
            readOnly={loading}
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
        </section>

        {/* text input for country */}
        <FormInput
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
        <h2
          className="form-subtitle"
          onClick={() => {
            console.log(images);
            console.log(menus);
          }}
        >
          Images
        </h2>

        {/* file input to upload restaurant images */}
        <ImageUploadInput
          disabled={loading}
          label="Restaurant Images"
          htmlFor="restaurant-images"
          value={images}
          handleChange={setImages}
          additionalInfo=""
          className="input-override"
        />

        {/* file input to  upload restaurant menu */}
        <ImageUploadInput
          disabled={loading}
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

        {/* select input to set parking details */}
        <SelectInput
          disabled={loading}
          required
          label="parking"
          htmlFor="parking"
          className="input-override"
          value={details.parking}
          handleChange={(e) => {
            setDetails({ ...details, parking: e.target.value });
          }}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="unavailable">Unavailable</option>
        </SelectInput>

        {/* select input to set reservation details */}
        <SelectInput
          disabled={loading}
          value={details.reservation}
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

        {/* select input to set pets allowed details */}
        <SelectInput
          disabled={loading}
          value={details.petsAllowed}
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

        {/* select input to set takeout details */}
        <SelectInput
          disabled={loading}
          value={details.takeout}
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

        {/* select input to set wifi details */}
        <SelectInput
          disabled={loading}
          value={details.wifi}
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

        {/* number input to display wait time */}
        <FormInput
          readOnly={loading}
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
          additionalInfo="(in mins)"
        />

        <h2
          className="form-subtitle"
          onClick={() => {
            console.log(hours);
          }}
        >
          Hours
        </h2>

        {/* hour range input for sunday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="sunday"
          className="time-range-input"
          value2={hours.sunday.to}
          value1={hours.sunday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              sunday: { ...hours.sunday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              sunday: { ...hours.sunday, from: e.target.value },
            });
          }}
        />

        {/* hour range input for monday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="monday"
          className="time-range-input"
          value2={hours.monday.to}
          value1={hours.monday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              monday: { ...hours.monday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              monday: { ...hours.monday, from: e.target.value },
            });
          }}
        />

        {/* hour range input for tuesday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="tuesday"
          className="time-range-input"
          value2={hours.tuesday.to}
          value1={hours.tuesday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              tuesday: { ...hours.tuesday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              tuesday: { ...hours.tuesday, from: e.target.value },
            });
          }}
        />

        {/* hour range input for wednesday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="wednesday"
          className="time-range-input"
          value2={hours.wednesday.to}
          value1={hours.wednesday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              wednesday: { ...hours.wednesday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              wednesday: { ...hours.wednesday, from: e.target.value },
            });
          }}
        />

        {/* hour range input for thursday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="thursday"
          className="time-range-input"
          value2={hours.thursday.to}
          value1={hours.thursday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              thursday: { ...hours.thursday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              thursday: { ...hours.thursday, from: e.target.value },
            });
          }}
        />

        {/* hour range input for friday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="friday"
          className="time-range-input"
          value2={hours.friday.to}
          value1={hours.friday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              friday: { ...hours.friday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              friday: { ...hours.friday, from: e.target.value },
            });
          }}
        />

        {/* hour range input for saturday's available hours */}
        <HourRangeInput
          readOnly={loading}
          label="saturday"
          className="time-range-input"
          value2={hours.saturday.to}
          value1={hours.saturday.from}
          handleChange2={(e) => {
            setHours({
              ...hours,
              saturday: { ...hours.saturday, to: e.target.value },
            });
          }}
          handleChange1={(e) => {
            setHours({
              ...hours,
              saturday: { ...hours.saturday, from: e.target.value },
            });
          }}
        />

        <h2
          className="form-subtitle"
          onClick={() => {
            console.log(tags);
          }}
        >
          Tags
        </h2>

        {/* list of text input components and a button that allows a user to add tags, delete tags, and modify tags */}
        <AddTagInput disabled={loading} handleAnyChange={setTags} />

        {/* Require a captcha verification to ensure a bot is not spamming the form. */}
        {/* <ReCAPTCHA
          className="captcha"
          ref={captcha}
          size="normal"
          render="explicit"
          sitekey={process.env.REACT_APP_SITE_KEY}
          onChange={verifyCallback}
        ></ReCAPTCHA> */}

        {/* buttom to submit form */}
        <CustomButton
          // disabled={loading || !verified}
          disabled={loading}
          type="submit"
          className="input-override"
          margin
        >
          submit
        </CustomButton>
        {/* If the captcha has not been verified, then display a message requiring that they fulfill the captcha. */}
        {/* {!verified ? (
          <p className="contact-requirement">
            Please fill out captcha to proceed
          </p>
        ) : null} */}
      </form>
    </section>
  );
};

// maps redux state to the components prop values as a higher order component
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

// exports apply page as the default while wrapping redux state as props to apply page via higher order component
export default connect(mapStateToProps)(ApplyPage);
