/*
  Contributors: Julie Do 014101748
  Course: CECS 470

  Description: This functional component displays a restaurants information and allows a user to edit the restaurant information if they are the owner of the restaurant. Restaurant information includes all related reviews, a description, tags, a map of the restaurant location, the address, details, and much more. Most of these values are editable should the user choose to edit their restaurant.
*/

// IMPORT MAIN PACKAGES
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// IMPORT STYLES
import "./restaurant-page.styles.scss";

// IMPORT COMPONENTS
import Divider from "../../components/divider/divider.component";
import Tag from "../../components/tag/tag-v2.component";
import Carousel from "../../components/carousel/carousel.component";
import Review from "../../components/review/review.component";
import ReviewInput from "../../components/review-input/review-input.component";
import MapContainer from "../../components/map-container/map-container.component";
import Tabs from "../../components/tabs/tabs.component";
import HourRangeInput from "../../components/hour-range-input/hour-range.component";
import SelectInput from "../../components/select-input/select-input.component";
import FormInput from "../../components/form-input/form-input.component";
import AddTagInput from "../../components/add-tag-input/add-tag-input.component";
import ImageUploadInput from "../../components/img-upload-input/img-upload-inputcomponent";
import LoadingAnimation from "../../components/loading-animation/loading-animation.component";

// IMPORT ICONS
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

// Functional Component Restaurant Page
const RestaurantPage = ({ match, currentUser, ...props }) => {
  // These are the state variables used to check whether or not the page is currently being edited, what variable is currently being edited, if the page is still loading it's information, the images/menus to be uploaded if new values are edited, and the restaurants default information.
  const [editable, setEditable] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({
    restaurantName: "",
    restaurantTags: [],
    description: "",
    dateOpen: "",
    ownerid: {
      _id: "",
      fname: "",
      lname: "",
      email: "",
    },
    reviews: [],
    address: "",
    address2: "",
    city: "",
    zipcode: "",
    state: "",
    location: [],
    hours: {
      sunday: {
        _from: "",
        _to: "",
      },
      monday: {
        _from: "",
        _to: "",
      },
      tuesday: {
        _from: "",
        _to: "",
      },
      wednesday: {
        _from: "",
        _to: "",
      },
      thursday: {
        _from: "",
        _to: "",
      },
      friday: {
        _from: "",
        _to: "",
      },
      saturday: {
        _from: "",
        _to: "",
      },
    },
    details: {
      parking: "",
      reservation: false,
      petsAllowed: false,
      takeout: false,
      wifi: false,
      waitTime: "",
    },
    website: "",
    menu: [],
    images: [],
    limelightCondition: "",
  });

  // This allows us to redirect the user to a new page of the restaurant is not found.
  const browserHistory = useHistory();

  // This use effect triggers on component mount and any time the url parameter id is updated. It loads the restaurant pages information and stores it in the state variable. While doing so, it adjusts the loading variable to state whether or not the page should currently display loading as it is fetching data.
  useEffect(() => {
    let source = axios.CancelToken.source();
    console.log("Use Effect 1 called . . . ");
    const validate = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${BASE_API_URL}/restaurant/${match.params.restaurantId}`,
          { cancelToken: source.token }
        );

        setRestaurant({ ...restaurant, ...response.data });
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error(error);
          browserHistory.push("/error-page");
        }
      }
    };

    validate();

    return () => {
      setLoading(false);
      source.cancel();
    };
  }, [match.params.restaurantId]);

  // This function updates the tags of the restaurant page.
  const setTags = (tags) => {
    setRestaurant({ ...restaurant, restaurantTags: tags });
  };

  // This function disables editing of a particular variable.
  const saveEdit = (input) => {
    setEditInput("");
  };

  // This function deletes an image from the restaurant images.
  const deleteImage = (deletedImage) => {
    let newImages = restaurant.images.filter((image) => image !== deletedImage);
    setRestaurant({ ...restaurant, images: newImages });
  };

  // This function deletes a menu from the restaurant menus.
  const deleteMenu = (deletedMenu) => {
    let newMenu = restaurant.menu.filter(
      (menuimage) => menuimage !== deletedMenu
    );
    setRestaurant({ ...restaurant, menu: newMenu });
  };

  // This function updates the reviews of the restaurant is a new one is posted.
  const updateReviews = (newReview) => {
    let reviews = restaurant.reviews;
    reviews.push(newReview);
    setRestaurant({ ...restaurant, reviews });
  };

  // This function is a generic handler changing any shallow value inside of the restaurant object/
  const handleChange = (e) => {
    const value = e.target.value;
    setRestaurant({ ...restaurant, [e.target.name]: value });
  };

  // This function converts a 24 hour based string into a 12 hour based string with AM and PM.
  const convertTime = (time) => {
    time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? " AM" : " PM";
      time[0] = +time[0] % 12 || 12;
    }

    return time.join("");
  };

  // This function saves all new changes of the restaurant to the database.
  const saveAll = async (e) => {
    await axios
      .post(
        `${BASE_API_URL}/restaurant/${match.params.restaurantId}`,
        restaurant
      )
      .then(async (res) => {
        if (menu.length >= 1 || images.lengt >= 1) {
          let id = match.params.id;
          let formData = new FormData();

          for (let i = 0; i < images.length; i++) {
            formData.append("images[]", images[i]);
          }

          for (let i = 0; i < menu.length; i++) {
            formData.append("menu[]", menu[i]);
          }

          return await axios.post(
            `${BASE_API_URL}/img-upload/${id}`,
            formData,
            {
              "Content-Type": "multipart/form-data",
            }
          );
        } else {
          return "No new images!";
        }
      })
      .then((res) => {
        if (res.data) {
          setRestaurant({ ...restaurant, images: res.data.images });
        }
      })
      .catch((error) => console.error(error));
  };

  // This variable contains an array of tag components.
  const tags = restaurant.restaurantTags.map((tag, index) => {
    return <Tag key={`${tag} ${index}`} value={tag}></Tag>;
  });

  // This variable contains an array of restaurant review components, loaded dynamically.
  const reviews = restaurant
    ? restaurant.reviews.map((review, index) => {
        return (
          <li key={`${review.user._id} ${index}`}>
            <Review
              user={review.user.fname}
              avatar={review.user.avatar}
              date={review.date}
              content={review.content}
              images={review.images}
              rating={review.rating}
            ></Review>
          </li>
        );
      })
    : null;

  // Returns a loading animation of the restaurant has not retrieved any data yet, or the restaurant's edit page if the edit variable has been set, or the restaurant page otherwise.
  return loading ? (
    <LoadingAnimation></LoadingAnimation>
  ) : editable && restaurant ? (
    // This is the restaurant editing html. It contains a form with various different inputs for the different values of the restaurant.
    <section className="restaurant-page">
      {/* This div is used purely to style the restaurant page's main content (via grid-area). */}
      <div className="restaurant-page-main">
        <h1 className="restaurant-page-form-header">
          {restaurant.restaurantName}
        </h1>
        <form action="" method="put" id="manage-restaurant">
          {/* This div is used purely to format the general style of part of the restaurant page, as forms do not allow usage of certain css styles. */}
          <div className="restaurant-page-main-manage">
            <fieldset form="manage-restaurant" className="restaurant-container">
              {/* This button is used to save changes to the database. */}
              <button
                className="restaurant-page-button"
                type="button"
                onClick={() => {
                  saveAll();
                  setEditable(false);
                }}
              >
                YOU ARE MODIFYING YOUR RESTAURANT. CLICK TO <span>SAVE</span>{" "}
                YOUR CHANGES.
              </button>
              {/* This div is used purely to style the restaurant name input with an editing button. */}
              <div className="restaurant-name">
                {/* This input is used to edit the restaurant's name. */}
                <label htmlFor="restaurantName">
                  <span>Edit Restaurant Name</span>
                  <input
                    type="text"
                    name="restaurantName"
                    id="name"
                    required
                    className="name"
                    value={restaurant.restaurantName}
                    onChange={handleChange}
                    disabled={editInput !== "name"}
                  />
                </label>
                {/* These buttons are used to determine if this variable is being edited or not. */}
                {editInput === "name" ? (
                  <button type="button" onClick={() => saveEdit("name")}>
                    <AddIcon></AddIcon>
                  </button>
                ) : (
                  <button type="button" onClick={() => setEditInput("name")}>
                    <EditIcon></EditIcon>
                  </button>
                )}
              </div>
              {/* This div is used only to style the opening date and owner of the restaurant.*/}
              <div className="restaurant-page-information">
                <p>Opened {restaurant.dateOpen.split(" ")[0]}</p>
                <p>
                  Owned by {restaurant.ownerid.fname} {restaurant.ownerid.lname}
                </p>
              </div>
            </fieldset>
            {/* This fieldset allows the user to edit the images of the restaurant page. */}
            <fieldset form="manage-restaurant" className="restaurant-container">
              {/* This div is used purely to style the carousel, which requires a specified width. */}
              <div className="restaurant-page-carousel">
                <Carousel
                  images={restaurant.images}
                  manage
                  size={3}
                  deleteImage={deleteImage}
                />
              </div>
              {/* This div is used purely to style the restaurant page upload beneath the carousel. */}
              <div className="restaurant-page-upload">
                <ImageUploadInput
                  label="New Restaurant Images"
                  htmlFor="restaurant-images"
                  value={images}
                  handleChange={setImages}
                />
              </div>
              <Divider full={true} />
            </fieldset>
            {/* This fieldset is used to edit the restaurant description. */}
            <fieldset form="manage-restaurant" className="restaurant-container">
              {/* This div is used purely to style the text area input next to an edit button. */}
              <div className="restaurant-description">
                <FormInput
                  type="textarea"
                  htmlFor="description"
                  label="description"
                  value={restaurant.description}
                  handleChange={(e) => {
                    setRestaurant({
                      ...restaurant,
                      description: e.target.value,
                    });
                  }}
                  maxLength="500"
                  additionalInfo="(max length: 500 characters"
                  disabled={editInput !== "description"}
                />
                {/* These buttons are used to determine if this variable is being edited or not. */}
                {editInput === "description" ? (
                  <button type="button" onClick={() => saveEdit("description")}>
                    <AddIcon></AddIcon>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditInput("description")}
                  >
                    <EditIcon></EditIcon>
                  </button>
                )}
              </div>
            </fieldset>
          </div>
        </form>
      </div>
      {/* This section is the inputs stuck to the side of the page.*/}
      <section className="restaurant-page-side">
        <div className="restaurant-page-side-contents">
          {/* This fieldset is used to edit the tags of the restaurant page. */}
          <fieldset form="manage-restaurant-extra">
            <div className="restaurant-page-tags">
              {editable ? (
                <AddTagInput
                  disabled
                  tagValues={restaurant.restaurantTags}
                  handleAnyChange={setTags}
                ></AddTagInput>
              ) : (
                <ul>{tags}</ul>
              )}
            </div>
          </fieldset>
          {/* This section displays the map container and address. */}
          <section className="restaurant-page-map">
            <MapContainer
              className="restaurant-page-map-container"
              latitude={restaurant.location[0]}
              longitude={restaurant.location[1]}
              markers={[
                {
                  title: restaurant.restaurantName,
                  name: restaurant.restaurantName,
                  lat: restaurant.location[0],
                  lng: restaurant.location[1],
                },
              ]}
            />
            <p>{`${restaurant.address} ${
              restaurant.city
            } ${restaurant.state.toUpperCase()} USA`}</p>
          </section>
          {/* This section displays the other extra variables that are not the map. */}
          <section className="restaurant-page-others-container">
            <div className="restaurant-page-others">
              {/* The tabs component provides a tabbing system for each extra component. */}
              <Tabs
                labels={["Details", "Menu", "Hours"]}
                content={[
                  // This is the details fieldset, used to edit different details of the restaurant.
                  <fieldset form="restaurant-manage-extra">
                    <div className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <SelectInput
                            label="parking"
                            htmlFor="parking"
                            disabled={editInput !== "parking"}
                            value={restaurant.details.parking}
                            handleChange={(e) => {
                              setRestaurant({
                                ...restaurant,
                                details: {
                                  ...restaurant.details,
                                  parking: e.target.value,
                                },
                              });
                            }}
                          >
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                            <option value="unavailable">Unavailable</option>
                          </SelectInput>
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "parking" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("parking")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("parking")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <SelectInput
                            label="wifi"
                            htmlFor="wifi"
                            disabled={editInput !== "wifi"}
                            value={restaurant.details.wifi}
                            handleChange={(e) => {
                              let val =
                                e.target.value === "true" ? true : false;
                              setRestaurant({
                                ...restaurant,
                                details: {
                                  ...restaurant.details,
                                  wifi: val,
                                },
                              });
                            }}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </SelectInput>
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "wifi" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("wifi")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("wifi")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <div className="restaurant-page-detail-buttons">
                            <SelectInput
                              label="takeout"
                              htmlFor="takeout"
                              disabled={editInput !== "takeout"}
                              value={restaurant.details.takeout}
                              handleChange={(e) => {
                                let val =
                                  e.target.value === "true" ? true : false;
                                setRestaurant({
                                  ...restaurant,
                                  details: {
                                    ...restaurant.details,
                                    takeout: val,
                                  },
                                });
                              }}
                            >
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </SelectInput>
                            {/* These buttons are used to determine if this variable is being edited or not. */}
                            {editInput === "takeout" ? (
                              <button
                                type="button"
                                onClick={() => saveEdit("takeout")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setEditInput("takeout")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <SelectInput
                            label="reservation"
                            htmlFor="reservation"
                            disabled={editInput !== "reservation"}
                            value={restaurant.details.reservation}
                            handleChange={(e) => {
                              let val =
                                e.target.value === "true" ? true : false;
                              setRestaurant({
                                ...restaurant,
                                details: {
                                  ...restaurant.details,
                                  reservation: val,
                                },
                              });
                            }}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </SelectInput>
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "reservations" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("reservation")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("reservation")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </fieldset>,
                  // This is the menu fieldset, used to edit the menu images of the restaurant.
                  <fieldset form="restaurant-manage-extra">
                    <Carousel
                      className="restaurant-page-menu"
                      images={restaurant.menu}
                      manage
                      size={1}
                      deleteImage={deleteMenu}
                    />
                    <ImageUploadInput
                      label="New Restaurant Images"
                      htmlFor="restaurant-images"
                      value={menu}
                      handleChange={setMenu}
                      defaultSize={2}
                    />
                  </fieldset>,
                  // This is the times fieldset, used to edit the times of the restaurant.
                  <fieldset form="restaurant-manage-extra">
                    <div className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="su"
                            value1={restaurant.hours.sunday._from}
                            value2={restaurant.hours.sunday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  sunday: {
                                    ...restaurant.hours.sunday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  sunday: {
                                    ...restaurant.hours.sunday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "sunday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "sunday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("sunday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("sunday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="mo"
                            value1={restaurant.hours.monday._from}
                            value2={restaurant.hours.monday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  monday: {
                                    ...restaurant.hours.sunday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  monday: {
                                    ...restaurant.hours.sunday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "monday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "monday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("monday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("monday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="tu"
                            value1={restaurant.hours.tuesday._from}
                            value2={restaurant.hours.tuesday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  tuesday: {
                                    ...restaurant.hours.tuesday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  tuesday: {
                                    ...restaurant.hours.tuesday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "tuesday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "tuesday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("tuesday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("tuesday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="we"
                            value1={restaurant.hours.wednesday._from}
                            value2={restaurant.hours.wednesday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  wednesday: {
                                    ...restaurant.hours.wednesday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  wednesday: {
                                    ...restaurant.hours.wednesday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "wednesday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "wednesday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("wednesday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("wednesday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="th"
                            value1={restaurant.hours.thursday._from}
                            value2={restaurant.hours.thursday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  thursday: {
                                    ...restaurant.hours.thursday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  thursday: {
                                    ...restaurant.hours.thursday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "thursday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "thursday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("thursday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("thursday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="fr"
                            value1={restaurant.hours.friday._from}
                            value2={restaurant.hours.friday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  friday: {
                                    ...restaurant.hours.friday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  friday: {
                                    ...restaurant.hours.friday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "friday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "friday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("friday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("friday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="sa"
                            value1={restaurant.hours.saturday._from}
                            value2={restaurant.hours.saturday._to}
                            handleChange2={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  sunday: {
                                    ...restaurant.hours.saturday,
                                    _to: e.target.value,
                                  },
                                },
                              });
                            }}
                            handleChange1={(e) => {
                              setRestaurant({
                                ...restaurant,
                                hours: {
                                  ...restaurant.hours,
                                  sunday: {
                                    ...restaurant.hours.saturday,
                                    _from: e.target.value,
                                  },
                                },
                              });
                            }}
                            disabled={editInput !== "saturday"}
                          />
                          {/* These buttons are used to determine if this variable is being edited or not. */}
                          {editInput === "saturday" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("saturday")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("saturday")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </fieldset>,
                ]}
              ></Tabs>
            </div>
          </section>
        </div>
      </section>
      <section className="restaurant-page-reviews">
        <h2>Reviews</h2>
        <ul>{reviews}</ul>
      </section>
    </section>
  ) : (
    // This renders the restaurant page without edits.
    <section className="restaurant-page">
      <section className="restaurant-page-main">
        {/* If the user viewing the page is the owner of the restaurant, they will see a button allowing them to edit the restaurant. */}
        {currentUser._id === restaurant.ownerid._id ? (
          <button
            className="restaurant-page-button"
            type="button"
            onClick={() => setEditable(true)}
          >
            YOU ARE THE OWNER. IF YOU WOULD LIKE TO MODIFY YOUR RESTAURANT,
            CLICK TO <span>EDIT</span>.
          </button>
        ) : null}
        {/* This displays the general restaurant information such as name, images, open date, and owner. */}
        <h1>{restaurant.restaurantName}</h1>
        <section className="restaurant-page-information">
          <p>Opened {restaurant.dateOpen.split(" ")[0]}</p>
          <p>
            Owned by {restaurant.ownerid.fname} {restaurant.ownerid.lname}
          </p>
        </section>
        <Divider full={true} />
        <section className="restaurant-page-carousel">
          <Carousel images={restaurant.images} size={3} />
        </section>
      </section>
      {/* This displays a restaurants description, review-input, and reviews. */}
      <section className="restaurant-page-more">
        <section className="restaurant-page-description">
          <h2>Description</h2>
          <p>{restaurant.description}</p>
        </section>
        {/* If the current user is a patron, they will be allowed to review/will see a review input form. If they are an owner, they will not be allowed to review. */}
        {currentUser._cls === "Client.Patron" ? (
          <section className="restaurant-page-review-input">
            <h2>Have something to say?</h2>
            <ReviewInput
              restaurant={match.params.restaurantId}
              updateReviews={updateReviews}
            ></ReviewInput>
          </section>
        ) : null}
        <section className="restaurant-page-reviews">
          <h2>Reviews</h2>
          <ul>{reviews}</ul>
        </section>
      </section>
      {/* This section displays the side content of the restaurant page that is the extra information. This includes things such as the location, tags, details, menu, and hours. */}
      <section className="restaurant-page-side">
        <div className="restaurant-page-side-contents">
          <section className="restaurant-page-tags">
            <h2>Tags</h2>
            <ul>{tags}</ul>
          </section>
          <section className="restaurant-page-map">
            <h2>Map & Location</h2>
            <MapContainer
              className="restaurant-page-map-container"
              latitude={restaurant.location[0]}
              longitude={restaurant.location[1]}
              markers={[
                {
                  title: restaurant.restaurantName,
                  name: restaurant.restaurantName,
                  lat: restaurant.location[0],
                  lng: restaurant.location[1],
                },
              ]}
            />
            <p>{`${restaurant.address} ${
              restaurant.city
            } ${restaurant.state.toUpperCase()} USA`}</p>
          </section>
          <div className="restaurant-page-others-container">
            <section className="restaurant-page-others">
              <Tabs
                labels={["Details", "Menu", "Hours"]}
                content={[
                  // This is a list of restaurant details.
                  <React.Fragment>
                    <dl className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <dt>Parking</dt>
                        <dd>{restaurant.details.parking}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Wifi</dt>
                        <dd>
                          {restaurant.details.wifi
                            ? "Available"
                            : "Unavailable"}
                        </dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Takeout</dt>
                        <dd>
                          {restaurant.details.takeout
                            ? "Available"
                            : "Unavailable"}
                        </dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Reservations</dt>
                        <dd>
                          {restaurant.details.reservation
                            ? "Available"
                            : "Unavailable"}
                        </dd>
                      </div>
                    </dl>
                  </React.Fragment>,
                  // This is a carousel of the restaurant menu.
                  <React.Fragment>
                    <Carousel
                      className="restaurant-page-menu"
                      images={restaurant.menu}
                      size={1}
                    />
                  </React.Fragment>,
                  // This is a list of all restaurant hours.
                  <dl className="restaurant-page-details">
                    <div className="restaurant-page-detail">
                      <dt>Sunday</dt>
                      <dd>
                        {convertTime(restaurant.hours.sunday._from)} -{" "}
                        {convertTime(restaurant.hours.sunday._to)}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Monday</dt>
                      <dd>
                        {convertTime(restaurant.hours.monday._from)} -{" "}
                        {convertTime(restaurant.hours.monday._to)}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Tuesday</dt>
                      <dd>
                        {convertTime(restaurant.hours.tuesday._from)} -{" "}
                        {convertTime(restaurant.hours.tuesday._to)}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Wednesday</dt>
                      <dd>
                        {convertTime(restaurant.hours.wednesday._from)} -{" "}
                        {convertTime(restaurant.hours.wednesday._to)}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Thursday</dt>
                      <dd>
                        {convertTime(restaurant.hours.thursday._from)} -{" "}
                        {convertTime(restaurant.hours.thursday._to)}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Friday</dt>
                      <dd>
                        {convertTime(restaurant.hours.friday._from)} -{" "}
                        {convertTime(restaurant.hours.friday._to)}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Saturday</dt>
                      <dd>
                        {convertTime(restaurant.hours.saturday._from)} -{" "}
                        {convertTime(restaurant.hours.saturday._to)}
                      </dd>
                    </div>
                  </dl>,
                ]}
              ></Tabs>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

// This is a variable used to wrap the functional Restaurant Page component as a higher order component to attach user redux variables shared globally. The user redux variables here are the logged in user's information. This is so that restaurant page knows whether or not to allow a user to edit the page or post a review to the page.
const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  currentUser: user.currentUser,
});

// Attach the redux values as a higher order component to the restaurant page and export as the default component of Restaurant Page.
export default connect(mapStateToProps)(RestaurantPage);
