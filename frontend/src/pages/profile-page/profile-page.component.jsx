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
            placesVisited: "54",
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
                        <img className="profile-img" src={this.state.profilePic} alt="user"/>
                        <ul>
                            <li>{this.state.location}</li>
                            <li>Member Since: {this.state.joinDate}</li>
                            <li>Places Visited: {this.state.placesVisited}</li>
                            <li>Reviews: {this.state.reviews}</li>
                        </ul>
                        <h3>About</h3>
                        <p>Tom Dumpling here. Programmer who loves wontons. I give my honest opinions in my reviews.</p>
                        <div className="userContainer-inner">
                            <h3>Favorites</h3> {/* consider these as links in the future*/}
                            <p>{this.state.favorites}</p>
                            <span>
                                <p>img goes here</p>
                                {/* <img className="map-img" src={this.state.map} alt="map"/> */}
                            </span>
                        </div>
                    </div>
                    <Divider />
                    <h2>{this.state.name}'s Reviews</h2>
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant: Joe's</li>
                            <li>Date Posted: 3/16/2020</li>
                            <li>Review:</li>
                        </ul>
                        <p>My favorite Wonton place in the whole wide world! Customer service is definitely top-notch whenever I visit. The pork dumplings are a MUST. You can have it as an appetizer or with some soup. They also accept Google Pay in case you forget your wallet!</p>
                        {/* <li><img className="review-img" src={this.state.photo} alt="food"/></li> */}
                    </div>
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant: Prosperitis</li>
                            <li>Date Posted: 9/21/2019</li>
                            <li>Review:</li>
                        </ul>
                        <p>Came here to fill my smoothie craving one day but left disappointed. Staff took forever to notice me walk in and take my order. I ordered a mango slush but saw that my cup was halfway full? I asked for a new drink but they told me I had to pay for a new one when it wasn't even my fault. The manager clearly needs to train their employees properly. Never coming here again.</p>
                        {/* <li><img className="review-img" src={this.state.photo} alt="food"/></li> */}
                    </div>
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant: Engrave</li>
                            <li>Date Posted: 8/14/2019</li>
                            <li>Review:</li>
                        </ul>
                        <p>I ordered three chicken tacos for carryout. Complimentary chips and salsa were a plus, but I received my food cold. Hopefully next time it won't be like that.</p>
                        {/* <li><img className="review-img" src={this.state.photo} alt="food"/></li> */}
                    </div>
                    <div className="userReviews">
                        <ul>
                            <li>Restaurant: Waffle House</li>
                            <li>Date Posted: 6/3/2019</li>
                            <li>Review:</li>
                        </ul>
                        <p>Visited this place with some coworkers and ordered the Waffle House Special. It consisted of strawberries, powdered sugar, melted marshmellows, and chocolate syrup drizzled on top. Absolutely delicious!</p>
                        {/* <li><img className="review-img" src={this.state.photo} alt="food"/></li> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfilePage;