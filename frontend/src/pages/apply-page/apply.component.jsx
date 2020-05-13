// import React from "react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// custom components:
import ImageCard from "../../components/image-card/image-card.component";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageUploadInput from "../../components/img-upload-input/img-upload-inputcomponent";
import SelectInput from "../../components/select-input/select-input.component";
import HourRangeInput from "../../components/hour-range-input/hour-range.component";
import Tag from "../../components/tag/tag-v2.component";
import AddTagInput from "../../components/add-tag-input/add-tag-input.component";
import Modal from "../../components/modal/modal.component";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";
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

const ApplyPage = ({ userAuth, ...props }) => {
  const browserHistory = useHistory();

  const [loading, setLoading] = useState(false);

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

  const findLocationInfo = async () => {
    const addressStr = `${address1}, ${city}, ${state} ${zipcode}, ${country}`;

    let geoCode = await geocodeByAddress(addressStr);
    let results = await getLatLng(geoCode[0]);

    console.log(results);

    return results;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        console.log("SUBMITTEEEEEEDD");
        console.log(res.data);

        // let id = res.data._id.$oid;
        submitImages(res.data._id.$oid);
      })
      .catch((err) => {
        console.log(textData);
        console.error(err);
        setLoading(false);
      });
  };

  const submitImages = async (restaurantId) => {
    let formData = new FormData();

    //  console.log(this.state.restaurant_new.images.length)
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    //  console.log(this.state.restaurant_new.menu.length)
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

  const handleSelect = async (addressStr) => {
    const results = await geocodeByAddress(addressStr);
    const addressSegments = results[0].formatted_address.split(",");
    setAddress1(addressSegments[0].trim());
    setCity(addressSegments[1].trim());
    setState(addressSegments[2].trim().split(" ")[0].trim().toLowerCase());
    setZipCode(addressSegments[2].trim().split(" ")[1].trim());
  };

  return (
    <section className="apply-page-container">
      {loading ? (
        <Modal defaultShow backdrop>
          <LoadingAnimation
            // horizontal
            // background
            text1="Uploading Images"
            text2="Please Wait"
          />
        </Modal>
      ) : null}

      <h1 className="apply-form-header input-override">
        Submit your restaurant!
      </h1>

      <form onSubmit={submitForm}>
        <h2 className="form-subtitle">Basic Information</h2>
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

        <h2
          className="form-subtitle"
          // onClick={() => {
          //   axios
          //     .get("https://maps.googleapis.com/maps/api/geocode/json", {
          //       params: {
          //         key: "AIzaSyC3aa1jBRam7QevnEvIcNtj2OpLAFe3UtA",
          //         address: "14524 Halldale Ave, Gardena, CA 90247, USA",
          //       },
          //     })
          //     .then((res) => {
          //       console.log(res);
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //     });
          // }}
          // onClick={() => {
          //   console.log(address1);
          //   console.log(city);
          //   console.log(state);
          //   console.log(zipcode);
          //   console.log(country);
          // }}
          onClick={findLocationInfo}
        >
          Address
        </h2>

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
                      </li>
                    );
                  })}
                </ul>
              </div>
            </React.Fragment>
          )}
        </PlacesAutocomplete>

        {/* <FormInput
          readOnly={loading}
          required
          type="text"
          htmlFor="street-address"
          label="Street Address"
          value={address1}
          handleChange={(e) => {
            setAddress1(e.target.value);
          }}
          className="input-override"
        /> */}

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

        <section className="city-state-zip-container">
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
        <h2
          className="form-subtitle"
          onClick={() => {
            console.log(images);
            console.log(menus);
          }}
        >
          Images
        </h2>

        <ImageUploadInput
          disabled={loading}
          label="Restaurant Images"
          htmlFor="restaurant-images"
          value={images}
          handleChange={setImages}
          additionalInfo=""
          className="input-override"
        />

        <ImageUploadInput
          disabled={loading}
          // disabled
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

        <AddTagInput disabled={loading} handleAnyChange={setTags} />

        <CustomButton
          disabled={loading}
          type="submit"
          className="input-override"
          margin
        >
          submit
        </CustomButton>
      </form>
    </section>
  );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

export default connect(mapStateToProps)(ApplyPage);
