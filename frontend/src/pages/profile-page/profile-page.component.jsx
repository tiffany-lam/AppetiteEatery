// Importing React
import React, { Component } from "react";

// Custom Style Sheet
import "./profile-page.styles.scss";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Tom",
            userName: "wonton-tom",
            city: "San Francisco",
            state: "CA",
            joinDate: "1/27/19",
            placesVisited: "23",
            reviews: "14"
        }
    }

    render() {
        return (
            <div className="userInfo">
                <span className="info">{this.state.name}</span>
                <span className="info">{this.state.userName}</span>
                <span className="info">{this.state.city}</span>
                <span className="info">{this.state.state}</span>
                <span className="info">{this.state.joinDate}</span>
                <span className="info">{this.state.placesVisited}</span>
                <span className="info">{this.state.reviews}</span>
            </div>
        )
    }
}

export default ProfilePage;