import React from "react";
import StarsIcon from "@material-ui/icons/Stars";

import Rating from "../../components/rating/rating.component";

import "./home-page.styles.scss";

const restaurants = [
  {
    name: "Waffle House",
    url:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1547&q=80",
    rating: 4,
  },

  {
    name: "Auntie Maile's",
    url:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
    rating: 3,
  },
  {
    name: "Vegeta",
    url:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80",
    rating: 2,
  },
  {
    name: "Joe's",
    url:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    rating: 5,
  },
  {
    name: "Prosperitis",
    url:
      "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    rating: 2,
  },
  {
    name: "Lime and Lemons",
    url:
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    rating: 1,
  },
  {
    name: "Potato's Sack",
    url:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
    rating: 4,
  },
  {
    name: "Engrave",
    url:
      "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    rating: 3,
  },
  {
    name: "To Eat or 2Eat",
    url:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    rating: 4,
  },
];

const HomePage = () => {
  return (
    <div className="home-page-container">
      {/* <h1>Limelight</h1> */}
      <div className="limelight-container">
        <div className="header-box">
          {/* <h1>limelight</h1> */}
          {/* <p>Where niche and quality meet!</p>
          <p>These restaurants are hand selected everyday!</p>
          <p>Hover over to!</p> */}
          <h1>limelight</h1>
          <div className="lime"></div>
          <div className="spotlight"></div>
        </div>
        {restaurants.map((restaurant, i) => (
          <div className="image-container">
            <div className="more-info">
              <div className="pop-up-details">
                <h2>{restaurant.name} </h2>
                <Rating rating={restaurant.rating} />
              </div>
            </div>
            <div className="spotlight-mask-container">
              <img key={i} src={restaurant.url}></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className="home-page-container">
  //     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
  //     doloremque quisquam expedita! Impedit corporis nostrum pariatur maxime
  //     amet dicta corrupti voluptas provident officia quas earum sint, cum sit
  //     repellat doloribus enim cupiditate illo! Possimus non fugit sequi eos,
  //     earum natus nulla minima soluta consequatur odio ipsum illo deleniti nemo
  //     quasi beatae molestias iste sint sunt! Expedita, eaque quos? Commodi
  //     possimus neque aut corporis ipsa quia voluptatem numquam nesciunt velit
  //     ipsum, beatae eius cupiditate mollitia ex ut quis ipsam, deserunt nobis?
  //     Ab nam voluptatem cupiditate et ut, officia similique veniam quas facilis
  //     assumenda temporibus eligendi itaque, nemo laudantium! Quisquam,
  //     asperiores praesentium.
  //   </div>
  // );
};

export default HomePage;
