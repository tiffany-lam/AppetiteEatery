/*
  Contributors: Sam Alhaqab 017018649
  Course: CECS 470

  Description: This functional component returns a navigational bar containing links to all the 
  main pages and/or functions of our website. It also conditionally displays certain links 
  depending on the user's authentication status.
*/

// main packages:
import ReactDOM from "react-dom";

// the functionional portal component places the passed in children component on the root level
// of the document
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById("root"));
};

export default Portal;
