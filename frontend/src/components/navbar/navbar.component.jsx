import React from "react";

import { Link } from "react-router-dom";
import RegisterModal from "../auth/RegisterModal";
import SearchIcon from "@material-ui/icons/Search";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./navbar.styles.scss";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  handleModalOpen = () => {
    // this.setState((prevState) => {
    //   return{
    //     modalOpen: !prevState.modalOpen
    //   }
      
    // })
    this.setState({
      modalOpen: !this.state.modalOpen
      
    })
  }
  registerButton = () => {
    // if (this.props.auth.isAuthed) {
    //   return (<Button id="navButton"  href="/" onClick={this.props.logoutAction}>Log Out</Button>
    //   )
    // }
    
    console.log("inside clicked");
    return (<RegisterModal show={true} />)

  }
  render() {
    return (
      <div>
      <nav>
        <p>
          {/* <LocalDiningIcon id="fork-knife-icon" /> */}
          <span id="appetite-text">appetite</span>
          <LocalDiningIcon id="fork-knife-icon" />

          {/* <FiberManualRecordIcon id="small-dot-icon" /> */}
          <span id="eatery-text">eatery</span>
        </p>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/graduated">Graduated</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {/* {this.state.modalOpen== true?<RegisterModal/>:''} */}
            <RegisterModal modalOpen = {this.state.modalOpen}/>
            <a onClick = {this.handleModalOpen} >Login </a>
            
            
          </li>
        </ul>
      </nav>
        
      </div>
    );
  }
}

export default Navbar;
