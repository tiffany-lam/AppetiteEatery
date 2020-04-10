// IMPORT MAINS
import React, { Component } from "react";

// IMPORT STYLES
import "./restaurant-page.styles.scss";

// IMPORT COMPONENTS
import Divider from "../../components/divider/divider.component";
import Tag from "../../components/tag/tag.component";

class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "xxxy",
      owner: "xxx",
      name: "ChickPls",
      description:
        "This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious!",
      tags: ["chick", "chick", "chick"],
      images: ["chick", "chick", "chick"],
      menu: ["chick", "chick", "chick"],
      map: ["chick", "chick", "chick"],
      details: {
        parking: "yes",
        wifi: "yes",
        takeout: "yes",
        reservation: "yes",
      },
    };
  }

  render() {
    const tags = this.state.tags.map((tag) => {
      return this.state.owner === this.state.user ? (
        <Tag type="delete">tag</Tag>
      ) : (
        <Tag>tag</Tag>
      );
    });

    const view = (
      <section className="restauraunt-page">
        <h1 className="restauraunt-name">
          <span className="view">
            <span className="label">Restaurant Name </span>
            <span className="name">{this.state.name}</span>
          </span>
        </h1>
        <section className="restauraunt-description">
          <Divider full={true} />
          <div className="view">
            <h2 className="label">Description</h2>
            <p className="description">{this.state.description}</p>
            <p className="extra">
              <span className="open">Opened 04/20/69</span>
              <span className="owner">Owned by {this.state.owner}</span>
            </p>
          </div>
        </section>
        <section>
          <Divider full={true} />
          <h2>Tags</h2>
        </section>
        <section>
          <Divider full={true} />
          <h2>Images</h2>
        </section>
        <section className="restaurant-others">
          <Divider full={true} />
          <section>
            <h2>Menu</h2>
          </section>
          <section>
            <h2>Map</h2>
          </section>
          <section>
            <h2>Details</h2>
          </section>
        </section>

        <div className="temp">
          <ul>{tags}</ul>
        </div>
        <Tag type="add" />
      </section>
    );

    const manage = (
      <section className="restauraunt-page">
        <h1>Restaurant Name Owned</h1>
        <Divider full={true} />
        <section>
          <h2>Description</h2>
        </section>
        <section>
          <h2>Tags</h2>
        </section>
        <section>
          <h2>Images</h2>
        </section>
        <section className="restaurant-others">
          <section>
            <h2>Menu</h2>
          </section>
          <section>
            <h2>Map</h2>
          </section>
          <section>
            <h2>Details</h2>
          </section>
        </section>
      </section>
    );

    return (
      <React.Fragment>
        {this.state.owner === this.state.user ? manage : view}
      </React.Fragment>
    );
  }
}

export default RestaurantPage;
