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
            userName: "wonton-tom",
            location: "San Francisco, CA",
            joinDate: "1/27/19",
            placesVisited: "23",
            reviews: "14",
            profilePic: "https://images.unsplash.com/photo-1489481039754-8701aeda983b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
            map: "https://www.massive.pr/wp-content/uploads/2018/01/shutterstock_127728257-1038x576-tender-1024x568.jpg",
            photo: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="pageBackground">
                    <div className="userInfo">
                        <ul>
                            <li><img class="profile-pic" src={this.state.profilePic} alt="user"/></li>
                            <li>{this.state.name}</li>
                            <li>@{this.state.userName}</li>
                            <li>{this.state.location}</li>
                            <li>Member Since: {this.state.joinDate}</li>
                            <li>Places Visited: {this.state.placesVisited}</li>
                            <li>Reviews: {this.state.reviews}</li>
                            <li><img class="map-img" src={this.state.map} alt="map"/></li>
                        </ul>
                    </div>
                    <Divider />
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant Name: Wonton-a-Bay </li>
                            <li>Date Posted: 5/16/19</li>
                            <li>Review Comment:</li>
                            <li>My favorite Wonton place in the whole wide world! </li>
                            <li><img class="review-img" src={this.state.photo} alt="map"/></li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfilePage;