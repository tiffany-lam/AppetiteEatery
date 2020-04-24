// IMPORT MAINS
import React, { Component } from "react";

import { connect } from "react-redux";
import {
  setUserAuth,
  setCurrentUser,
  resetUserRedux,
} from "../../redux/user/user.actions";

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
      user: {
        username: "A. Monge",
        avatar:
          "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      },
      owner: {
        username: "A. Monge Owner",
        avatar:
          "https://images.unsplash.com/photo-1586912597722-f4f14ed28572?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      },
      name: "General Vegeta's",
      description:
        "Welcome to General Vegeta's hometown local favorite of vegetable based dishes, such as vegetable curry, vegetable noodles, and vegetable stir fry! You name it, and we offer it with vegetables. We even offer a variety of guranteed vegan meals for your enjoyment! So come stop by, or should I say come stop buy? We've got everything you want and need to feel as healthy as you should be!",
      tags: [
        "Veggies",
        "Vegetarian",
        "Vegan",
        "Delicious",
        "Vegatable-Curry",
        "Stirfry",
        "Vegetable-Noodles",
        "Best-Glass-Noodles",
        "Italian-Veggie-Pastas",
        "Soups",
      ],
      reviews: [
        {
          user: {
            username: "Janie",
            avatar:
              "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          },
          date: "1/1/1",
          content:
            "I really liked this food. The vegetables tasted fresh in my food and I pretty much enjoyed everything I tried here.",
          rating: 5,
          images: [
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
        {
          user: {
            username: "Gabril",
            avatar:
              "https://images.unsplash.com/photo-1539418561314-565804e349c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          },
          date: "2/2/2",
          content: "I really did not like this food.",
          rating: 3,
          images: [
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          ],
        },
        {
          user: {
            username: "Leticia",
            avatar:
              "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
          },
          date: "3/3/3",
          content: "Boom shaka laka",
          rating: 2,
          images: [
            "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          ],
        },
        {
          user: {
            username: "Cameron",
            avatar:
              "https://images.unsplash.com/photo-1476293602671-beea27e1e702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          },
          date: "4/4/4",
          content:
            "What can I say, I'm a dude who likes food and a foodie whose tastes seek only perfection. This restaurant hits all my pinterest needs, all my yelp travel desires, it just h i t s the spot if you know what I mean. And I mean I'm a hell of a carnivore, but this place? Bruh. This friggin' place. I love it.",
          rating: 1,
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
            "I just wanted pasta, but I don't think I got what I was looking for here. They're kind of a lie, cause I mean look at all those hashtags with noodles in it dude. And there was like, one or two noodle dishes there when I came in and they did not. taste. good. I swear it to you by my adorable doggo, don't come here for noodles. Maybe for spinach if you want. I saw a lot of nasty cans of the good ol' Popeyes spinach man. Also, be careful of the people working here, I swear they were eyeing me up like they haven't had any payin' customers come in in a l o o n g time. I mean understandable, but please... It's genuinely kind of scary... Yeah idk. The deco was all wack too. There were like animal heads everywhere, and just, what? You're all about veggies and vegetarian and vegan and here I am just seeing massive amounts of dead animals staring at me with their blank dead eyes. Not inviting for an appetizing meal. Owner was chill though lmao.",
          rating: 1,
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
            "Was pretty good. Made me feel better after I got fired, dumped, and then disowned. Probably the highlight of my day. I guess.",
          rating: 4,
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
      hours: {
        sunday: "11:00 am - 10:00 pm",
        monday: "11:00 am - 10:00 pm",
        tuesday: "11:00 am - 10:00 pm",
        wednesday: "11:00 am - 10:00 pm",
        thursday: "11:00 am - 10:00 pm",
        friday: "11:00 am - 10:00 pm",
        saturday: "11:00 am - 10:00 pm",
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

  own = () => {
    this.setState({
      user: { username: "A. Monge Owner", avatar: this.state.user.avatar },
    });
  };

  noOwn = () => {
    this.setState({
      user: { username: "A. Monge", avatar: this.state.user.avatar },
    });
  };

  deleteTag = (del) => {
    let newTags = this.state.tags.filter((tag) => tag !== del);

    this.setState({ tags: newTags });
  };

  render() {
    const tags = this.state.tags.map((tag) => {
      return this.state.owner.username === this.state.user.username ? (
        <Tag type="delete" key={tag} delete={this.deleteTag}>
          {tag}
        </Tag>
      ) : (
        <Tag key={tag}>{tag}</Tag>
      );
    });

    const reviews = this.state.reviews.map((review) => {
      return (
        <li key={review.user.username}>
          <Review
            user={review.user.username}
            avatar={review.user.avatar}
            date={review.date}
            content={review.content}
            images={review.images}
            rating={review.rating}
          ></Review>
          {/* <Divider full={true} /> */}
        </li>
      );
    });

    const view = (
      <section className="restaurant-page">
        <section className="restaurant-page-main">
          <h1>{this.state.name}</h1>
          <div className="restaurant-page-information">
            <p>Opened {this.state.open}</p>
            <p>Owned by {this.state.owner.username}</p>
          </div>
          <Divider full={true} />
          <div className="restaurant-page-carousel">
            <Carousel images={this.state.images} size={3} />
          </div>
        </section>
        <section className="restaurant-page-more">
          <section className="restaurant-page-description">
            <h2>Description</h2>
            <p>{this.state.description}</p>
          </section>
          <section className="restaurant-page-review-input">
            <h2>Have something to say?</h2>
            <ReviewInput
              user={this.state.user.username}
              avatar={this.state.user.avatar}
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
                        images={this.state.menus}
                        size={1}
                      />
                    </React.Fragment>,
                    // <React.Fragement>
                    <dl className="restaurant-page-details">
                      <div className="restaurant-page-detail">
                        <dt>Sunday</dt>
                        <dd>{this.state.hours.sunday}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Monday</dt>
                        <dd>{this.state.hours.monday}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Tuesday</dt>
                        <dd>{this.state.hours.tuesday}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Wednesday</dt>
                        <dd>{this.state.hours.wednesday}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Thursday</dt>
                        <dd>{this.state.hours.thursday}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Friday</dt>
                        <dd>{this.state.hours.friday}</dd>
                      </div>
                      <div className="restaurant-page-detail">
                        <dt>Saturday</dt>
                        <dd>{this.state.hours.saturday}</dd>
                      </div>
                    </dl>,
                  ]}
                ></Tabs>
              </div>
              <div className="temp">
                <button type="button" onClick={this.own}>
                  OWN
                </button>
                <button type="button" onClick={this.noOwn}>
                  DISOWN
                </button>
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
            // className="restaurant-page-main-manage"
            id="manage-restaurant"
          >
            <div className="restaurant-page-main-manage">
              <fieldset
                form="manage-restaurant"
                className="restaurant-container"
              >
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
                  <p>Owned by {this.state.owner.username}</p>
                </div>
              </fieldset>
              <fieldset
                form="manage-restaurant"
                className="restaurant-container"
              >
                <div className="restaurant-page-carousel">
                  <Carousel images={this.state.images} manage size={3} />
                </div>
                <Divider full={true} />
              </fieldset>
              <fieldset
                form="manage-restaurant"
                className="restaurant-container"
              >
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
              <h2>Google Maps</h2>
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
                          <label htmlFor="parking">Parking</label>
                          <div className="restaurant-page-detail-buttons">
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
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Wifi</label>
                          <div className="restaurant-page-detail-buttons">
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
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Takeout</label>
                          <div className="restaurant-page-detail-buttons">
                            <div className="restaurant-page-detail-buttons">
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
                                  <option value="unavailable">
                                    Unavailable
                                  </option>
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
                                  <option value="unavailable">
                                    Unavailable
                                  </option>
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
                            </div>
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Reservations</label>
                          <div className="restaurant-page-detail-buttons">
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
                        </div>
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
                    <fieldset form="restaurant-manage-extra">
                      <div className="restaurant-page-details">
                        <div className="restaurant-page-detail">
                          <label htmlFor="sunday">Sunday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "sunday" ? (
                              <input
                                name="sunday"
                                id="sunday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="sunday"
                                id="sunday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "sunday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("sunday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("sunday")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Monday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "monday" ? (
                              <input
                                name="monday"
                                id="monday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="monday"
                                id="monday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "monday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("monday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("monday")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Tuesday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "tuesday" ? (
                              <input
                                name="tuesday"
                                id="tuesday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="tuesday"
                                id="tuesday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "tuesday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("tuesday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("tuesday")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Wednesday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "wednesday" ? (
                              <input
                                name="wednesday"
                                id="wednesday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="wednesday"
                                id="wednesday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "wednesday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("wednesday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("wednesday")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Thursday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "thursday" ? (
                              <input
                                name="thursday"
                                id="thursday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="thursday"
                                id="thursday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "thursday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("thursday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("thursday")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Friday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "friday" ? (
                              <input
                                name="friday"
                                id="friday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="friday"
                                id="friday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "friday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("friday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("friday")}
                              >
                                <EditIcon></EditIcon>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="restaurant-page-detail">
                          <label>Saturday</label>
                          <div className="restaurant-page-detail-buttons">
                            {this.state.edit === "saturday" ? (
                              <input
                                name="saturday"
                                id="saturday-select"
                                className="active"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                              ></input>
                            ) : (
                              <input
                                name="saturday"
                                id="saturday-select"
                                className="inactive"
                                type="time"
                                min="00:00"
                                max="24:00"
                                required
                                disabled
                              ></input>
                            )}
                            {this.state.edit === "saturday" ? (
                              <button
                                type="button"
                                onClick={() => this.saveEdit("saturday")}
                              >
                                <AddIcon></AddIcon>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => this.setEdit("saturday")}
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
                <button type="button" onClick={this.own}>
                  OWN
                </button>
                <button type="button" onClick={this.noOwn}>
                  DISOWN
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="restaurant-page-reviews">
          <h2>Reviews</h2>
          <ul>{reviews}</ul>
        </section>
        {/* <form
          action=""
          method="put"
          id="manage-restaurant-extra"
          className="restaurant-page-side"
        > */}
        {/* <div className="restaurant-page-side-contents">
            <fieldset form="manage-restaurant-extra">
              <div className="restaurant-page-tags">
                <ul>{tags}</ul>
              </div>
            </fieldset>
            UHHHHHHHH FIGURE OUT A WAY TO SEND THIS LMAO
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
                  labels={["Details", "Menu", "Hours"]}
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
                  ]}
                ></Tabs>
              </div>
              <div className="temp">
                <button type="button" onClick={this.own}>
                  OWN
                </button>
                <button type="button" onClick={this.noOwn}>
                  DISOWN
                </button>
              </div>
            </div>
          </div> */}
        {/* </form> */}
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
        {this.state.owner.username === this.state.user.username ? manage : view}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  setCurrentUser: (userId) => dispatch(setCurrentUser(userId)),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);
