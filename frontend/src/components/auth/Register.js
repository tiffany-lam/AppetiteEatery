import React from "react";
import {Redirect} from "react"
import {Button, Modal} from 'react-bootstrap'
import "./register.styles.scss";
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            modalShow: false,
            userType: null,
        };

    }
    handleClick = e =>{
        this.setState({userType: e.target.value, modalShow: true})
     
    };
    showModal = () =>{
        this.setState({
            userType: e.target.value,
            modalShow: !this.state.show
        });

    }

    closeModal = () =>{
        this.setState({modalShow: false})
    }
     // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
        step: step + 1
        });
    };

    // Go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
        step: step - 1
        });
    };
    
    render(){
 
        switch(step){
            case 1: 
                return(       
                    <Modal>
                        <div class = "Register">Are you a Appetite or an Eatery</div>
                        <Button value = "user"  onClick={this.nextStep+1}>User</Button>
                        <Button value = "restaurant_owner" onClick = {this.nextStep}>Restaurant Owner</Button>
                    </Modal>
                );
            //case 2, 1+1, is for Users
            case 2: 
                return(
                    <Modal>
                        <Modal.Header>Register as a Restaurant Owner</Modal.Header>
                        <div class = "Register">  </div>
                        <div className = "formTitle">Register as a User</div>
  
                    </Modal>
                );
            //case 3 is for the Restaurant Owner
            case 3: 
                return(
                    <Modal>
                        <Modal.Header>Register as a Restaurant Owner</Modal.Header>


                    </Modal>
                );

                    
                    <div className = "registerBox">
                        <form>
                            {/* First name */}
                            <div className = "formField">
                            <label>First name: </label>
                            <input type = "text" id = "fname" className="formInput" placeholder = "Enter your full name" name = "first_name" /> 
                            {/* name - used to reference elements after submitted */}
                            </div>
                            {/* Last name */}
                            <div className = "formField">
                                <label>Last Name: </label>
                                <input type = "text" id = "lname" className = "formInput" placeholder = "Enter your last name" name = "last_name" />
                            </div>
                            {/* Email to register them by */}
                            <div className = "formField">
                                <label>Email: </label>
                                <input type = "email" id = "email" className = "formInput" placeholder = "Enter your email" name = "email" />
                            </div>
                            {/* Register button / If they already have an acct */}
                            <div>
                                <button className = "registerBtn">Register</button>
                                <a href ='#' className = "registerLink">I already have an account"</a>
                            </div>
                        </form>
                    </div> 
          

        );
    }
}export default Register;