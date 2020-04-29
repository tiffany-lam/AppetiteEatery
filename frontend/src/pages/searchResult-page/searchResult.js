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

//import style
import "./searchResult-page.styles.scss";
class searchResult extends Component {
    onSearchChange = e =>{

    }
    render(){
        return(
            <div>
                 <Card className = "cardSize">
                    <CardContent className ="mdc-card_primary-action" tabindex="0">
                        <CardMedia /> {/*restaurantPhoto here */}
                        <div className = "card__primary">
                            <CardHeader className = "">Restaurant Name</CardHeader>
                            <Typography className = "">Address</Typography>
                        </div>

                    </CardContent>
                    <CardActions>
                        <IconButton>
                            <FavoriteIcon className = "favIcon" />
                        </IconButton>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
                    </CardActions>

                </Card>
                <Pagination count={10} />
            </div>
           
        );
    }
}
export default searchResult;