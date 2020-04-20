import { UserActionTypes, INITIAL_STATE } from "./user.types";

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.RESET_USER_REDUX:
      return action.payload;
    case UserActionTypes.SET_USER_AUTH:
      return {
        ...state,
        userAuth: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
