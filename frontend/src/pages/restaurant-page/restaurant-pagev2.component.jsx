import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

// IMPORT STYLES
import "./restaurant-page.styles.scss";

// IMPORT COMPONENTS
import Divider from "../../components/divider/divider.component";
import Tag from "../../components/tag/tag.component";
import Carousel from "../../components/carousel/carousel.component";
import Review from "../../components/review/review.component";
import ReviewInput from "../../components/review-input/review-input.component";
import MapContainer from "../../components/map-container/map-container.component";
import Tabs from "../../components/tabs/tabs.component";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import HourRangeInput from "../../components/hour-range-input/hour-range.component";
import SelectInput from "../../components/select-input/select-input.component";
import FormInput from "../../components/form-input/form-input.component";

const RestaurantPage = ({ match, ...props }) => {
  const [editable, setEditable] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [loading, setLoading] = useState(true);
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

  const browserHistory = useHistory();

  const temporaryUser = {
    username: "hello!",
    avatar:
      "https://images.unsplash.com/photo-1470073755300-6ec0f9cfa01c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    console.log("Use Effect 1 called . . . ");
    const validate = async () => {
      console.log("Validate called . . .  ");
      console.log(match.params.restaurantId);
      setLoading(true);

      try {
        const response = await axios.get(
          `http://52.201.241.142/api/restaurant/${match.params.restaurantId}`,
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

  const saveEdit = (input) => {
    console.log(`SAVING ${input}`);
    setEditInput("");
  };

  const deleteTag = (deletedTag) => {
    let newTags = restaurant.restaurantTags.filter((tag) => tag !== deletedTag);
    setRestaurant({ ...restaurant, restaurantTags: newTags });
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const value = e.target.value;
    setRestaurant({ ...restaurant, [e.target.name]: value });
  };

  const tags = restaurant
    ? restaurant.restaurantTags.map((tag) => {
        return editable ? (
          <Tag type="delete" key={tag} delete={deleteTag}>
            {tag}
          </Tag>
        ) : (
          <Tag key={tag}>{tag}</Tag>
        );
      })
    : null;

  const reviews = restaurant
    ? restaurant.reviews.map((review) => {
        return (
          <li key={review.user._id}>
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

  return loading ? (
    <div>
      loading screen . . .
      <button
        onClick={() => {
          console.log(restaurant);
          console.log(editable && restaurant);
        }}
      >
        RESTAURANT
      </button>
    </div>
  ) : editable && restaurant ? (
    <section className="restaurant-page">
      <div className="restaurant-page-main">
        <form action="" method="put" id="manage-restaurant">
          <div className="restaurant-page-main-manage">
            <fieldset form="manage-restaurant" className="restaurant-container">
              <div className="restaurant-name">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(restaurant);
                  }}
                >
                  RESTAURANT
                </button>
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
              <div className="restaurant-page-information">
                <p>Opened {restaurant.dateOpen}</p>
                <p>
                  Owned by {restaurant.ownerid.fname} {restaurant.ownerid.lname}
                </p>
              </div>
            </fieldset>
            <fieldset form="manage-restaurant" className="restaurant-container">
              <div className="restaurant-page-carousel">
                <Carousel images={restaurant.images} manage size={3} />
              </div>
              <Divider full={true} />
            </fieldset>
            <fieldset form="manage-restaurant" className="restaurant-container">
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
      <div className="restaurant-page-side">
        <div className="restaurant-page-side-contents">
          <fieldset form="manage-restaurant-extra">
            <div className="restaurant-page-tags">
              <ul>{tags}</ul>
              {/* <Tag type="add"></Tag> */}
            </div>
          </fieldset>
          {/* UHHHHHHHH FIGURE OUT A WAY TO SEND THIS LMAO */}
          <section className="restaurant-page-map">
            {/* <h2>Google Maps</h2> */}
            <MapContainer />
          </section>
          <div className="restaurant-page-others-container">
            <div
              form="manage-restaurant-extra"
              className="restaurant-page-others"
            >
              <Tabs
                labels={["Details", "Menu", "Hours"]}
                content={[
                  <fieldset form="restaurant-manage-extra">
                    <div className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <SelectInput
                            label="parking"
                            htmlFor="parking"
                            disabled={editInput !== "parking"}
                            selected={restaurant.details.parking}
                          >
                            <option
                              value="Free"
                              selected={restaurant.details.parking === "Free"}
                            >
                              Free
                            </option>
                            <option
                              value="Paid"
                              selected={restaurant.details.parking === "Paid"}
                            >
                              Paid
                            </option>
                            <option
                              value="Unavailable"
                              selected={
                                restaurant.details.parking === "Unavailable"
                              }
                            >
                              Unavailable
                            </option>
                          </SelectInput>
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
                            selected={restaurant.details.wifi}
                          >
                            <option
                              value={true}
                              selected={restaurant.details.wifi === true}
                            >
                              Yes
                            </option>
                            <option
                              value={false}
                              selected={restaurant.details.wifi === false}
                            >
                              No
                            </option>
                          </SelectInput>
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
                              selected={restaurant.details.takeout}
                            >
                              <option
                                value={true}
                                selected={restaurant.details.wifi === true}
                              >
                                Yes
                              </option>
                              <option
                                value={false}
                                selected={restaurant.details.wifi === false}
                              >
                                No
                              </option>
                            </SelectInput>

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
                            selected={restaurant.details.reservation}
                          >
                            <option
                              value={true}
                              selected={restaurant.details.wifi === true}
                            >
                              Yes
                            </option>
                            <option
                              value={false}
                              selected={restaurant.details.wifi === false}
                            >
                              No
                            </option>
                          </SelectInput>
                          {editInput === "reservations" ? (
                            <button
                              type="button"
                              onClick={() => saveEdit("reservations")}
                            >
                              <AddIcon></AddIcon>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditInput("reservations")}
                            >
                              <EditIcon></EditIcon>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </fieldset>,
                  <fieldset form="restaurant-manage-extra">
                    <Carousel
                      className="restaurant-page-menu"
                      images={restaurant.menu}
                      manage
                      size={1}
                    />
                  </fieldset>,
                  <fieldset form="restaurant-manage-extra">
                    <div className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <div className="restaurant-page-detail-buttons">
                          <HourRangeInput
                            label="sunday"
                            value1={restaurant.hours.sunday._to}
                            value2={restaurant.hours.sunday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
                            label="monday"
                            value1={restaurant.hours.monday._to}
                            value2={restaurant.hours.monday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
                            label="tuesday"
                            value1={restaurant.hours.tuesday._to}
                            value2={restaurant.hours.tuesday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
                            label="wednesday"
                            value1={restaurant.hours.wednesday._to}
                            value2={restaurant.hours.wednesday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
                            label="thursday"
                            value1={restaurant.hours.thursday._to}
                            value2={restaurant.hours.thursday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
                            label="friday"
                            value1={restaurant.hours.friday._to}
                            value2={restaurant.hours.friday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
                            label="saturday"
                            value1={restaurant.hours.saturday._to}
                            value2={restaurant.hours.saturday._from}
                            handleChange1={(e) => {
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
                            handleChange2={(e) => {
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
            <div className="temp">
              <button type="button" onClick={() => setEditable(false)}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="restaurant-page-reviews">
        <h2>Reviews</h2>
        <ul>{reviews}</ul>
      </section>
    </section>
  ) : (
    <section className="restaurant-page">
      <section className="restaurant-page-main">
        <h1>{restaurant.restaurantName}</h1>
        <div className="restaurant-page-information">
          <p>Opened {restaurant.dateOpen}</p>
          <p>
            Owned by {restaurant.ownerid.fname} {restaurant.ownerid.lname}
          </p>
        </div>
        <Divider full={true} />
        <div className="restaurant-page-carousel">
          <Carousel images={restaurant.images} size={3} />
        </div>
      </section>
      <section className="restaurant-page-more">
        <section className="restaurant-page-description">
          <h2>Description</h2>
          <p>{restaurant.description}</p>
        </section>
        <section className="restaurant-page-review-input">
          <h2>Have something to say?</h2>
          <ReviewInput
            user={temporaryUser.username}
            avatar={temporaryUser.avatar}
          ></ReviewInput>
        </section>
        <section className="restaurant-page-reviews">
          <h2>Reviews</h2>
          <ul>{reviews}</ul>
        </section>
      </section>
      <section className="restaurant-page-side">
        <div className="restaurant-page-side-contents">
          <section className="restaurant-page-tags">
            <h2>Tags</h2>
            <ul>{tags}</ul>
          </section>
          <section className="restaurant-page-map">
            <MapContainer />
          </section>
          <div className="restaurant-page-others-container">
            <div className="restaurant-page-others">
              <Tabs
                labels={["Details", "Menu", "Hours"]}
                content={[
                  <React.Fragment>
                    <dl className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <dt>Parking</dt>
                        <dd>Free</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Wifi</dt>
                        <dd>Available</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Takeout</dt>
                        <dd>Available</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Reservations</dt>
                        <dd>Available</dd>
                      </div>
                    </dl>
                  </React.Fragment>,
                  <React.Fragment>
                    <Carousel
                      className="restaurant-page-menu"
                      images={restaurant.menu}
                      size={1}
                    />
                  </React.Fragment>,
                  // <React.Fragement>
                  <dl className="restaurant-page-details">
                    <div className="restaurant-page-detail">
                      <dt>Sunday</dt>
                      <dd>
                        {restaurant.hours.sunday._from} -{" "}
                        {restaurant.hours.sunday._to}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Monday</dt>
                      <dd>
                        {restaurant.hours.monday._from} -{" "}
                        {restaurant.hours.monday._to}}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Tuesday</dt>
                      <dd>
                        {restaurant.hours.tuesday._from} -{" "}
                        {restaurant.hours.tuesday._to}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Wednesday</dt>
                      <dd>
                        {restaurant.hours.wednesday._from} -{" "}
                        {restaurant.hours.wednesday._to}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Thursday</dt>
                      <dd>
                        {restaurant.hours.thursday._from} -{" "}
                        {restaurant.hours.thursday._to}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Friday</dt>
                      <dd>
                        {restaurant.hours.friday._from} -{" "}
                        {restaurant.hours.friday._to}
                      </dd>
                    </div>
                    <div className="restaurant-page-detail">
                      <dt>Saturday</dt>
                      <dd>
                        {restaurant.hours.saturday._from} -{" "}
                        {restaurant.hours.saturday._to}
                      </dd>
                    </div>
                  </dl>,
                ]}
              ></Tabs>
            </div>
            <div className="temp">
              <button type="button" onClick={() => setEditable(true)}>
                EDIT
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

export default connect(mapStateToProps)(RestaurantPage);
