import React, {Component} from "react";
import {Button, Modal} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.styles.scss";
class RegisterModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            show: true,
            firstName: '',
            lastName: '',
            email: '',
            userType: null
        }
    }
  
    handleClick = e =>{
        //store the userType here, either Patron or RestaurantOwner
        console.log("case 1, ", e.target.value);
        this.setState({userType: e.target.value, modalShow: true});
     
    };
    showModal = () =>{
        this.setState({ show: true });

    };

    closeModal = () =>{
        this.setState({show: false})
    };
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
    handleChange = input => e =>{
        this.setState({[input]: e.targe.value})
    }
    MyRegisterModal = props =>{
        return (
            <Modal {...props} >
                <Modal.Header>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    </div> {/*close registerBox div*/ }
                    
                </Modal.Body>
       
            
            </Modal>

        );
    };
    render(){
        //variables
        const {step} = this.state.step; 
        const {firstName, lastName, email} = this.state;
        const values = {firstName, lastName, email}
        return(
            <Modal show = {this.props.modalOpen} hide = {this.state.show} >
                {console.log ("test", this.state.show)}
                <h1>Welcome to Appetite Eatery!</h1>
                <p>Are you looking for munchies or are you a restaurant owner looking for exposure?</p>
                <Button
                    className=""
                    value="Patron"
                    onClick={this.openModal}
                >
                Patron
                </Button>
                <Button
                    className=""
                    value="RestaurantOwner"
                    onClick={this.openModal}
                >
                Restaurant Owner
                </Button>
    
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
             </Modal>
        );
        switch(step){
            // if it's case 1 render this
            case 1: 
                return(
                    <div>
                        <h1>Welcome to Appetite Eatery!</h1>
                        <p>Are you looking for munchies or are you a restaurant owner looking for exposure?</p>
                        <Button
                            className=""
                            value="Patron"
                            onClick={this._openModal}
                        >
                        Patron
                        </Button>
                        <Button
                            className=""
                            value="RestaurantOwner"
                            onClick={this._openModal}
                        >
                        Restaurant Owner
                        </Button>
                        <this.MyRegisterModal
                            show={this.state.show}
                            onHide={() => this.setState({show: false})}
                        />
                    </div>
                );

            // default: {
            //     return(
            //     <div id="login" className="container h-100">
            //         <div className="col-sm-12 my-auto">
            //           <div className="jumbotron text-center">
            //             <h1 className="display-4">Error</h1>
            //             <p className="lead">{this.state.error}</p>
            //           </div>
            //         </div>
            //     </div>
            //     );
            // }

        }       
    }
}export default RegisterModal;