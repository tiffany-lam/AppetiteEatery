import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
// import restaurantReducer from "./restaurant/restaurant.reducer";

export default combineReducers({
  user: userReducer,
  // restaurant: restaurantReducer,
});
