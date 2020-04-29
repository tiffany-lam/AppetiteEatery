import React, { Component } from "react";

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
import Pagination from '@material-ui/lab/Pagination';
import Avatar from '@material-ui/core/Avatar';
//other components
import Rating from "../../components/rating/rating.component";
//import style
import "./searchResult-page.styles.scss";

class searchResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            total: undefined
        };
    }
    // handleOnChange = pageValue =>{
    //     setPage(pageValue)
    // }
    onSearchChange = e =>{

    }
    render(){
        return(
            <div>
                <div className = "filter"> 
                    
                </div>
                 <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                        title ="restaurant photo"
                         /> {/*restaurantPhoto here */}
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ="Restaurant Name" 
                                subheader = "Address"
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={4}
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
                <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                        title ="restaurant photo"
                         /> {/*restaurantPhoto here */}
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ="Restaurant Name" 
                                subheader = "Address"
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={4}
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
                <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                        title ="restaurant photo"
                         /> {/*restaurantPhoto here */}
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ="Restaurant Name" 
                                subheader = "Address"
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={4}
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
                <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                        title ="restaurant photo"
                         /> {/*restaurantPhoto here */}
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ="Restaurant Name" 
                                subheader = "Address"
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={4}
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
                <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                        title ="restaurant photo"
                         /> {/*restaurantPhoto here */}
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ="Restaurant Name" 
                                subheader = "Address"
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={4}
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
                <Card className = "cardSize">
                    <CardContent tabindex="0">
                        <CardMedia 
                        component = "img"
                        className = "restaurantPhoto"
                        image="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                        title ="restaurant photo"
                         /> {/*restaurantPhoto here */}
                         <div className = "cardInfo"> 
                            <div className = "card__primary">
                                <CardHeader 
                                className = ""
                                title ="Restaurant Name" 
                                subheader = "Address"
                                />
                                <div id = "ratingPadding"> 
                                    <Rating
                                        rating={4}
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
                <Pagination
                    className = "pagination"
                    total ={this.state.total}
                    page = {this.state.page}
                    pageWindowLength={5}
                    onChange = {this.handleOnChange}
                />
            </div>
           
        );
    }
}
export default searchResult;