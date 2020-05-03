import React from 'react';
import {Link} from "react-router-dom";
import Rating from "../../components/rating/rating.component";
//import card stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80";
const RestaurantCard = ({
    restaurantName = "none",
    rating = 4,
    imageUrl = DEFAULT_IMAGE_URL,
    className, 
    address = "",
    to = "/"
}) =>{
    return(
        <Link 
            to = {to}
            className = {`card-view ${className}`}
        >
            <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image={imageUrl}
                        title ="restaurant photo"
                         /> 
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ={restaurantName}
                                subheader = {address}
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={rating}
                                        maxRating={5}
                                        icon={<FavoriteIcon />}
                                    ></Rating>
                                </div>
                                
                            </div>

                         </div>
                       
                    </CardContent>
                    <CardActions className = "iconBar">
                        <div className = "iconbar"> 
                            <IconButton>
                                <FavoriteIcon className = "favIcon" />
                            </IconButton>
                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                        </div>   
                    </CardActions>
                </Card>
            </Link>

    );
    
};
export default RestaurantCard;