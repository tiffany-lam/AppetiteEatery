import React from 'react';

const restaurantCard = props =>{
    const{

    } = props.restaurant || {}

    return(
        <Card className = "cardSize">
            <CardPrimaryContent className ="mdc-card_primary-action" tabindex="0">
                 <CardMedia /> {/*restaurantPhoto here */}
                 <div className = "card__primary">
                     <Headline6 className = "card__title">Restaurant Name</Headline6>
                     <Subtitle2 className = "card__subtitle">Address</Subtitle2>
                 </div>

            </CardPrimaryContent>
            <CardActions>
                <IconButton>
                    <MaterialIcon icon='favorite_border' />
                </IconButton>
                <IconButton>
                    <MaterialIcon icon='share' />
                </IconButton>
            </CardActions>

        </Card>

    )
    
}