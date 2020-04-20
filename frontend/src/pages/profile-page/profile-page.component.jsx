// Importing React
import React, { Component } from "react";

// Custom Style Sheet
import "./profile-page.styles.scss";
import Divider from "../../components/divider/divider.component";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Tom Dumpling",
            userName: "wontom",
            location: "San Francisco, CA",
            joinDate: "1/27/19",
            placesVisited: "23",
            reviews: "14",
            favorites: "#wontons, #tacos, #ice-cream, #fruit-smoothies, #matcha",
            profilePic: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
            map: "https://www.massive.pr/wp-content/uploads/2018/01/shutterstock_127728257-1038x576-tender-1024x568.jpg",
            photo: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="profile-page-container">
                    <div className="userContainer">
                        <h1>{this.state.name}</h1>
                        <h2>@{this.state.userName}</h2>
                        <div className="userContainer-inner">
                            <span>
                                <img className="profile-img" src={this.state.profilePic} alt="user"/>
                            </span>
                            <ul>
                                <li>{this.state.location}</li>
                                <li>Member Since: {this.state.joinDate}</li>
                                <li>Places Visited: {this.state.placesVisited}</li>
                                <li>Reviews: {this.state.reviews}</li>
                                <li>Favorites: {this.state.favorites}</li>
                            </ul>
                            <span>
                                <p>img goes here</p>
                                {/* <img className="map-img" src={this.state.map} alt="map"/> */}
                            </span>
                        </div>
                    </div>
                    <Divider />
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant: Joe's</li>
                            <li>Date Posted: 5/16/19</li>
                            <li>Review:</li>
                            <li>My favorite Wonton place in the whole wide world! </li>
                            {/* <li><img className="review-img" src={this.state.photo} alt="food"/></li> */}
                        </ul>
                    </div>
                    <Divider />
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant: Joe's</li>
                            <li>Date Posted: 5/16/19</li>
                            <li>Review:</li>
                            <li>My favorite Wonton place in the whole wide world! </li>
                            {/* <li><img className="review-img" src={this.state.photo} alt="food"/></li> */}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfilePage;