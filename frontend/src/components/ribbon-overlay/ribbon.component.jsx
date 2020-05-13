import React, { useState } from "react";
/*
  Contributors: Tiffany Lam 
  Course: CECS 470

  Description: This is the ribbon that we use to overlay the page. This ribbon lets viewers know this is a student made site

*/
import "./ribbon.styles.scss"
const Ribbon =({...props})=>{
    const [showRibbon, setShowRibbon] = useState(true);
    const toggleRibbon = () => setShowRibbon(!showRibbon);


    return(
        <section>
        {showRibbon ? (
        <div className= "ribbon-container" href = "/about-us"> 
            <span id = "ribbon"> 
                <span className = "notice"> Student made page!</span>
                 <p>
                 Made with love, sweat, and tears by Sam, Julie, Tiffany, and Veronica. 
                </p>
            </span>
            <span id="close" ><a href="#" onClick = {toggleRibbon}>x</a></span>
        </div>
        ):
        ("")}
    </section>
    );
}

export default Ribbon;