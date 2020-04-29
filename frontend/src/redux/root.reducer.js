import { combineReducers } from "redux";

import uiReducer from "./ui/ui.reducer";
import userReducer from "./user/user.reducer";
// import restaurantReducer from "./restaurant/restaurant.reducer";

export default combineReducers({
  user: userReducer,
  ui: uiReducer,
  // restaurant: restaurantReducer,
});
