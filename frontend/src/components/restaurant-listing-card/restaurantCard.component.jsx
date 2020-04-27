import React from 'react';

const restaurantCard = props =>{
    const{

    } = props.restaurant || {}

    return(
        <div>
            <div>Restaurant title</div>
            <div>Restaurant rating</div>
            <div>Restaurant photo </div>
            <div>Restaurant location</div>

        </div>

    )
    
}