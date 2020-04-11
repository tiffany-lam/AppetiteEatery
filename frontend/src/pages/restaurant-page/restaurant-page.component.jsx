// IMPORT MAINS
import React, { Component } from "react";

// IMPORT STYLES
import "./restaurant-page.styles.scss";

// IMPORT COMPONENTS
import Divider from "../../components/divider/divider.component";
import Tag from "../../components/tag/tag.component";
import CarouselFourHorizontal from "../../components/carouselfour-horizontal/carouselfour-horizontal.component";

class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "xxxy",
      owner: "xxx",
      name: "ChickPls",
      description:
        "This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious! This is delicious!",
      tags: ["chicka", "chickb", "chickc"],
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
      menu: [
        "https://images.pexels.com/photos/2617751/pexels-photo-2617751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://image.freepik.com/free-vector/restaurant-menu-template_23-2147510410.jpg",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gluten-free-menu-poster-template-a34844400e847b46fdf731d336c442c9_screen.jpg?ts=1498651899",
      ],
      map:
        "https://www.massive.pr/wp-content/uploads/2018/01/shutterstock_127728257-1038x576-tender-1024x568.jpg",
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
        <Tag type="delete" key={tag}>
          {tag}
        </Tag>
      ) : (
        <Tag key={tag}>{tag}</Tag>
      );
    });

    const images = this.state.images.map((url) => {
      return this.state.owner === this.state.user ? (
        <img className="content" src={url} alt="Food" />
      ) : (
        <img className="content" src={url} alt="Food" />
      );
    });

    const menus = this.state.menu.map((url) => {
      return this.state.owner === this.state.user ? (
        <img src={url} alt="Food" />
      ) : (
        <img src={url} alt="Food" />
      );
    });

    const view = (
      <div className="restauraunt-page-background">
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
          <section className="restauraunt-tags">
            <Divider full={true} />
            <h2 className="view">
              <span className="label">Tags</span>
            </h2>
            <ul className="content">{tags}</ul>
          </section>
          <section className="restauraunt-images">
            <Divider full={true} />
            <div className="view">
              <h2 className="label">Images</h2>
              {/* <div className="content">{images}</div> */}
              <CarouselFourHorizontal
                className="content"
                images={this.state.images}
              />
            </div>
          </section>
          <section className="restauraunt-others">
            <Divider className="line" full={true} />
            <section className="restauraunt-menu">
              <div className="view">
                <h2 className="label">Menu</h2>
                <div className="content">{menus}</div>
              </div>
            </section>
            <section className="restauraunt-map">
              <div className="view">
                <h2 className="label">Map</h2>
                <div className="content">
                  <img src={this.state.map} alt="map" />
                </div>
              </div>
            </section>
            <section className="restauraunt-details">
              <div className="view">
                <h2 className="label">Details</h2>
                <dl className="content">
                  <dt className="content1-label">Parking</dt>
                  <dd className="content1-content">Free</dd>
                  <Divider className="divider1" full={true} />
                  <dt className="content2-label">Wifi</dt>
                  <dd className="content2-content">Yes</dd>
                  <Divider className="divider2" full={true} />
                  <dt className="content3-label">Takeout</dt>
                  <dd className="content3-content">No</dd>
                  <Divider className="divider3" full={true} />
                </dl>
              </div>
            </section>
          </section>
        </section>
      </div>
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
          <Tag type="add" />
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
