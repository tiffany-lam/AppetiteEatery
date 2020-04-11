// IMPORT MAINS
import React, { Component } from "react";

// IMPORT STYLES
import "./restaurant-page.styles.scss";

// IMPORT COMPONENTS
import Divider from "../../components/divider/divider.component";
import Tag from "../../components/tag/tag.component";
import CarouselFourHorizontal from "../../components/carouselfour-horizontal/carouselfour-horizontal.component";
import CarousoelOneHorizontal from "../../components/carouselone-horizontal/carouselone-horizontal.component";
import CarouselOneHorizontal from "../../components/carouselone-horizontal/carouselone-horizontal.component";

class RestaurantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "xxx",
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

    const view = (
      <div className="restaurant-page-background">
        <section className="restaurant-page">
          <h1 className="restaurant-name">
            <span className="view">
              <span className="label">Restaurant Name </span>
              <span className="name">{this.state.name}</span>
            </span>
          </h1>
          <section className="restaurant-description">
            <Divider full={true} />
            <div className="view">
              <h2 className="label">Description</h2>
              <p className="description">{this.state.description}</p>
            </div>
            <p className="extra">
              <span className="open">Opened 04/20/69</span>
              <span className="owner">Owned by {this.state.owner}</span>
            </p>
          </section>
          <section className="restaurant-tags">
            <Divider full={true} />
            <h2 className="view">
              <span className="label">Tags</span>
            </h2>
            <ul className="content">{tags}</ul>
          </section>
          <section className="restaurant-images">
            <Divider full={true} />
            <div className="view">
              <h2 className="label">Images</h2>
              <CarouselFourHorizontal
                className="content"
                images={this.state.images}
              />
            </div>
          </section>
          <section className="restaurant-others">
            <Divider className="line" full={true} />
            <section className="restaurant-menu">
              <div className="view">
                <h2 className="label">Menu</h2>
                <CarouselOneHorizontal
                  className="content"
                  images={this.state.menus}
                />
              </div>
            </section>
            <section className="restaurant-map">
              <div className="view">
                <h2 className="label">Map</h2>
                <div className="content">
                  <img src={this.state.map} alt="map" />
                </div>
              </div>
            </section>
            <section className="restaurant-details">
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
      <section className="restaurant-page-background">
        <form
          action=""
          method="put"
          className="restaurant-page"
          id="manage-restaurant"
        >
          <fieldset form="manage-restaurant" className="restaurant-name">
            <label className="manage">
              <span className="label">Restaurant Name</span>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="name"
              />
            </label>
          </fieldset>
          <fieldset form="manage-restaurant" className="restaurant-description">
            <Divider full={true} />
            <label className="manage">
              <span className="label">Description</span>
              <textarea
                className="description"
                name="description"
                id="description"
                rows="5"
                cols="33"
              ></textarea>
            </label>
            <p className="extra">
              <span className="open">Opened 04/20/69</span>
              <span className="owner">Owned by {this.state.owner}</span>
            </p>
          </fieldset>
          <fieldset form="manage-restaurant" className="restaurant-tags">
            <Divider full={true} />
            <div className="manage">
              <p className="label">Tags</p>
              <Tag className="add-tag" type="add" />
              <ul className="content">{tags}</ul>
            </div>
          </fieldset>
          <fieldset form="manage-restaurant" className="restaurant-images">
            <Divider full={true} />
            <div className="manage">
              <label htmlFor="images" className="label">
                Images
              </label>
              <CarouselFourHorizontal
                className="content"
                images={this.state.images}
              />
            </div>
          </fieldset>
          {/* <fieldset form="manage-restaurant" className="restaurant-others">
              <Divider className="line" full={true} />
              <fieldset form="manage-restaurant" className="restaurant-menu">
                <label htmlFor="menus" className="label">
                  Menu
                </label>
                <CarouselOneHorizontal
                  className="content"
                  images={this.state.menus}
                />
              </fieldset>
              <fieldset form="manage-restaurant" className="restaurant-map">
                <label htmlFor="map" className="label">
                  Menu
                </label>
                <div className="content">
                  <img src={this.state.map} alt="map" />
                </div>
              </fieldset>
              <fieldset
                form="manage-restaurant"
                className="restaurant-details"
              >
                <label htmlFor="details" className="label"></label>
                <fieldset form="manage-restaurant" className="manage">
                  <label htmlFor="parking" className="label">
                    Parking
                  </label>
                  <Divider className="divider3" full={true} />
                  <label htmlFor="wifi" className="label">
                    Wifi
                  </label>
                  <Divider className="divider3" full={true} />
                  <label htmlFor="takeout" className="label">
                    Takeout
                  </label>
                  <Divider className="divider3" full={true} />
                </fieldset>
              </fieldset>
            </fieldset> */}
        </form>
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
