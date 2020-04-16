// IMPORT MAINS
import React, { Component } from "react";

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

class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "xxxy",
      owner: "xxx",
      name: "ChickPls",
      description:
        "This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious!",
      tags: [
        "chicka",
        "chickb",
        "chickc",
        "chicke",
        "chickf",
        "chickg",
        "chickh",
        "chicka",
        "chickb",
        "chickc",
        "chicke",
        "chickf",
        "chickg",
        "chickh",
      ],
      reviews: [
        {
          user: {
            username: "user1",
            avatar:
              "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          },
          date: "1/1/1",
          content: "I really liked this food.",
          images: [
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
        {
          user: {
            username: "user2",
            avatar:
              "https://images.unsplash.com/photo-1539418561314-565804e349c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          },
          date: "2/2/2",
          content: "I really did not like this food.",
          images: [
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          ],
        },
        {
          user: {
            username: "user3",
            avatar:
              "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
          },
          date: "3/3/3",
          content: "Boom shaka laka",
          images: [
            "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
        {
          user: {
            username: "user4",
            avatar:
              "https://images.unsplash.com/photo-1476293602671-beea27e1e702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          },
          date: "4/4/4",
          content:
            "i am a cat. i like catnip. blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.blep.",
          images: [
            "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
        {
          user: {
            username: "user5",
            avatar:
              "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
          },
          date: "5/5/5",
          content:
            "i am a dog. i like bonezo. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep. blep.",
          images: [
            "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
            "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
            "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
        {
          user: {
            username: "user6666666666",
            avatar:
              "https://images.unsplash.com/photo-1470073755300-6ec0f9cfa01c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
          },
          date: "6/6/6",
          content:
            "HELLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
          images: [
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
            "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
            "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
        "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      ],
      menus: [
        "https://images.pexels.com/photos/2617751/pexels-photo-2617751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://image.freepik.com/free-vector/restaurant-menu-template_23-2147510410.jpg",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gluten-free-menu-poster-template-a34844400e847b46fdf731d336c442c9_screen.jpg?ts=1498651899",
      ],
      map:
        "https://www.massive.pr/wp-content/uploads/2018/01/shutterstock_127728257-1038x576-tender-1024x568.jpg",
      details: {
        parking: "Free",
        wifi: "Available",
        takeout: "Available",
        reservation: "Available",
      },
      open: "4/20/19",
      edit: "",
    };
  }

  setEdit = (edit) => {
    this.setState({ edit: edit });
  };

  saveEdit = (edit) => {
    console.log(`SAVING ${edit}`);
    this.setState({ edit: "" });
  };

  render() {
    const tags = this.state.tags.map((tag) => {
      return this.state.owner === this.state.user ? (
        <Tag type="delete" key={tag}>
          {tag}
        </Tag>
      ) : (
        <Tag key={tag}>{tag}</Tag>
      );
    });

    const reviews = this.state.reviews.map((review) => {
      return (
        <li>
          <Review
            user={review.user.username}
            avatar={review.user.avatar}
            date={review.date}
            content={review.content}
            images={review.images}
          ></Review>
          <Divider full={true} />
        </li>
      );
    });

    const view = (
      <section className="restaurant-page">
        <section className="restaurant-page-main">
          <h1>{this.state.name}</h1>
          <div className="restaurant-page-information">
            <p>Opened {this.state.open}</p>
            <p>Owned by {this.state.owner}</p>
          </div>
          <Carousel
            className="restaurant-page-carousel"
            images={this.state.images}
            size={4}
          />
          <Divider full={true} />
          <section className="restaurant-page-description">
            <h2>Description</h2>
            <p>{this.state.description}</p>
          </section>
          <section className="restaurant-page-review-input">
            <h2>Have something to say?</h2>
            <ReviewInput></ReviewInput>
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
                  labels={["Details", "Menu"]}
                  content={[
                    <React.Fragment>
                      <dl className="restaurant-page-details">
                        <dt>Parking</dt>
                        <dd>Free</dd>
                        <Divider full={true} />
                        <dt>Wifi</dt>
                        <dd>Available</dd>
                        <Divider full={true} />
                        <dt>Takeout</dt>
                        <dd>Available</dd>
                        <Divider full={true} />
                        <dt>Reservations</dt>
                        <dd>Available</dd>
                      </dl>
                    </React.Fragment>,
                    <React.Fragment>
                      <Carousel
                        className="restaurant-page-menu"
                        images={this.state.menus}
                        size={1}
                      />
                    </React.Fragment>,
                  ]}
                ></Tabs>
              </div>
            </div>
          </div>
        </section>
      </section>
    );

    const manage = (
      <section className="restaurant-page">
        <div className="restaurant-page-main">
          <form
            action=""
            method="put"
            className="restaurant-page-main-manage"
            id="manage-restaurant"
          >
            <fieldset form="manage-restaurant" className="restaurant-container">
              <div className="restaurant-name">
                <label htmlFor="name">
                  <span>Edit Restaurant Name</span>
                  {this.state.edit === "name" ? (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="name"
                      value={this.state.name}
                    />
                  ) : (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="name"
                      value={this.state.name}
                      disabled
                    />
                  )}
                </label>
                {this.state.edit === "name" ? (
                  <button type="button" onClick={() => this.saveEdit("name")}>
                    <AddIcon></AddIcon>
                  </button>
                ) : (
                  <button type="button" onClick={() => this.setEdit("name")}>
                    <EditIcon></EditIcon>
                  </button>
                )}
              </div>
              <div className="restaurant-page-information">
                <p>Opened {this.state.open}</p>
                <p>Owned by {this.state.owner}</p>
              </div>
            </fieldset>
            <fieldset form="manage-restaurant" className="restaurant-container">
              <div className="restaurant-page-carousel">
                <Carousel images={this.state.images} manage size={4} />
              </div>
              <Divider full={true} />
            </fieldset>
            <fieldset form="manage-restaurant" className="restaurant-container">
              <div className="restaurant-description">
                <label htmlFor="description">
                  <span>Edit Restaurant Description</span>
                  {this.state.edit === "description" ? (
                    <textarea
                      value={this.state.description}
                      className="active"
                    ></textarea>
                  ) : (
                    <textarea
                      value={this.state.description}
                      disabled
                      className="inactive"
                    ></textarea>
                  )}
                </label>
                {this.state.edit === "description" ? (
                  <button
                    type="button"
                    onClick={() => this.saveEdit("description")}
                  >
                    <AddIcon></AddIcon>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => this.setEdit("description")}
                  >
                    <EditIcon></EditIcon>
                  </button>
                )}
              </div>
            </fieldset>
          </form>
          <section className="restaurant-page-reviews">
            <h2>Reviews</h2>
            <ul>{reviews}</ul>
          </section>
        </div>
        <form
          action=""
          method="put"
          id="manage-restaurant-extra"
          className="restaurant-page-side"
        >
          <div className="restaurant-page-side-contents">
            <fieldset form="manage-restaurant-extra">
              <div className="restaurant-page-tags">
                <ul>{tags}</ul>
              </div>
            </fieldset>
            {/* UHHHHHHHH FIGURE OUT A WAY TO SEND THIS LMAO */}
            <section className="restaurant-page-map">
              <h2>Google Maps</h2>
              <MapContainer />
            </section>
            <div className="restaurant-page-others-container">
              <div
                form="manage-restaurant-extra"
                className="restaurant-page-others"
              >
                <Tabs
                  labels={["Details", "Menu"]}
                  content={[
                    <fieldset form="restaurant-manage-extra">
                      <div className="restaurant-page-details">
                        <label htmlFor="parking">Parking</label>
                        {this.state.edit === "parking" ? (
                          <select
                            name="parking"
                            id="parking-select"
                            className="active"
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        ) : (
                          <select
                            name="parking"
                            id="parking-select"
                            className="inactive"
                            disabled
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        )}
                        {this.state.edit === "parking" ? (
                          <button
                            type="button"
                            onClick={() => this.saveEdit("parking")}
                          >
                            <AddIcon></AddIcon>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.setEdit("parking")}
                          >
                            <EditIcon></EditIcon>
                          </button>
                        )}
                        <Divider full={true} />
                        <label>Wifi</label>
                        {this.state.edit === "wifi" ? (
                          <select
                            name="wifi"
                            id="wifi-select"
                            className="active"
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        ) : (
                          <select
                            name="wifi"
                            id="wifi-select"
                            className="inactive"
                            disabled
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        )}
                        {this.state.edit === "wifi" ? (
                          <button
                            type="button"
                            onClick={() => this.saveEdit("wifi")}
                          >
                            <AddIcon></AddIcon>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.setEdit("wifi")}
                          >
                            <EditIcon></EditIcon>
                          </button>
                        )}
                        <Divider full={true} />
                        <label>Takeout</label>
                        {this.state.edit === "takeout" ? (
                          <select
                            name="takeout"
                            id="takeout-select"
                            className="active"
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        ) : (
                          <select
                            name="takeout"
                            id="takeout-select"
                            className="inactive"
                            disabled
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        )}
                        {this.state.edit === "takeout" ? (
                          <button
                            type="button"
                            onClick={() => this.saveEdit("takeout")}
                          >
                            <AddIcon></AddIcon>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.setEdit("takeout")}
                          >
                            <EditIcon></EditIcon>
                          </button>
                        )}
                        <Divider full={true} />
                        <label>Reservations</label>
                        {this.state.edit === "reservations" ? (
                          <select
                            name="reservations"
                            id="reservations"
                            className="active"
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        ) : (
                          <select
                            name="reservations"
                            id="reservations-select"
                            className="inactive"
                            disabled
                          >
                            <option value="none" selected disabled hidden>
                              Select an Option
                            </option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        )}
                        {this.state.edit === "reservations" ? (
                          <button
                            type="button"
                            onClick={() => this.saveEdit("reservations")}
                          >
                            <AddIcon></AddIcon>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.setEdit("reservations")}
                          >
                            <EditIcon></EditIcon>
                          </button>
                        )}
                      </div>
                    </fieldset>,
                    <fieldset form="restaurant-manage-extra">
                      <Carousel
                        className="restaurant-page-menu"
                        images={this.state.menus}
                        manage
                        size={1}
                      />
                    </fieldset>,
                  ]}
                ></Tabs>
              </div>
            </div>
          </div>
        </form>
      </section>
      // <section className="restaurant-page-background">
      //   <form
      //     action=""
      //     method="put"
      //     className="restaurant-page"
      //     id="manage-restaurant"
      //   >
      //     <fieldset form="manage-restaurant" className="restaurant-name">
      //       <label className="manage">
      //         <span className="label">Restaurant Name</span>
      //         <input
      //           type="text"
      //           name="name"
      //           id="name"
      //           required
      //           className="name"
      //           value={this.state.name}
      //           // onChange
      //         />
      //       </label>
      //     </fieldset>
      //     <fieldset form="manage-restaurant" className="restaurant-description">
      //       <Divider full={true} />
      //       <label className="manage">
      //         <span className="label">Description</span>
      //         <textarea
      //           className="description"
      //           name="description"
      //           id="description"
      //           rows="5"
      //           // cols="33"
      //           placeholder={this.state.description}
      //         ></textarea>
      //       </label>
      //       <p className="extra">
      //         <span className="open">Opened 04/20/69</span>
      //         <span className="owner">Owned by {this.state.owner}</span>
      //       </p>
      //     </fieldset>
      //     <fieldset form="manage-restaurant" className="restaurant-tags">
      //       <Divider full={true} />
      //       <div className="manage">
      //         <p className="label">Tags</p>
      //         <Tag className="add-tag" type="add" />
      //         <ul className="content">{tags}</ul>
      //       </div>
      //     </fieldset>
      //     <fieldset form="manage-restaurant" className="restaurant-images">
      //       <Divider full={true} />
      //       <div className="manage">
      //         <label htmlFor="images" className="label">
      //           Images
      //         </label>
      //         <CarouselFourHorizontal
      //           className="content"
      //           manage={this.state.user === this.state.owner}
      //           images={this.state.images}
      //         />
      //       </div>
      //     </fieldset>
      //     <fieldset form="manage-restaurant">
      //       <Divider className="line" full={true} />
      //       <div className="restaurant-others-manage">
      //         <fieldset form="manage-restaurant">
      //           <div className="restaurant-menu">
      //             <p className="label">Menu</p>
      //             <CarouselFourHorizontal
      //               className="content"
      //               manage={this.state.user === this.state.owner}
      //               images={this.state.menus}
      //             />
      //           </div>
      //         </fieldset>
      //         <fieldset form="manage-restaurant" className="restaurant-map">
      //           <Divider className="line" full={true} />
      //           <label htmlFor="map" className="label">
      //             Map
      //           </label>
      //           <div className="content">
      //             <img src={this.state.map} alt="map" />
      //           </div>
      //         </fieldset>
      //         <fieldset form="manage-restaurant" className="restaurant-details">
      //           <Divider className="line" full={true} />
      //           <div className="manage">
      //             <p className="label">Details</p>
      //             <fieldset form="manage-restaurant" className="manage">
      //               <Divider className="line" full={true} />
      //               <div className="content">
      //                 <label htmlFor="parking" className="content1-label">
      //                   Parking
      //                 </label>
      //                 <select
      //                   name="parking"
      //                   id="parking-select"
      //                   className="content1-content"
      //                 >
      //                   <option value="none" selected disabled hidden>
      //                     Select an Option
      //                   </option>
      //                   <option value="available">Available</option>
      //                   <option value="unavailable">Unavailable</option>
      //                 </select>
      //                 <Divider className="divider1" full={true} />
      //                 <label htmlFor="wifi" className="content2-label">
      //                   Wifi
      //                 </label>
      //                 <select
      //                   name="wifi"
      //                   id="wifi-select"
      //                   className="content2-content"
      //                 >
      //                   <option value="none" selected disabled hidden>
      //                     Select an Option
      //                   </option>
      //                   <option value="available">Available</option>
      //                   <option value="unavailable">Unavailable</option>
      //                 </select>
      //                 <Divider className="divider2" full={true} />
      //                 <label htmlFor="takeout" className="content3-label">
      //                   Takeout
      //                 </label>
      //                 <select
      //                   name="takeout"
      //                   id="takeout-select"
      //                   className="content3-content"
      //                 >
      //                   <option value="none" selected disabled hidden>
      //                     Select an Option
      //                   </option>
      //                   <option value="available">Available</option>
      //                   <option value="unavailable">Unavailable</option>
      //                 </select>
      //                 <Divider className="divider3" full={true} />
      //               </div>
      //             </fieldset>
      //           </div>
      //         </fieldset>
      //       </div>
      //     </fieldset>
      //   </form>
      // </section>
    );

    return (
      <React.Fragment>
        {this.state.owner === this.state.user ? manage : view}
      </React.Fragment>
    );
  }
}

export default RestaurantPage;
