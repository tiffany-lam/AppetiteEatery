import { UIActionTypes, INITIAL_STATE } from "./ui.types";

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UIActionTypes.RESET_UI:
      return action.payload;

    case UIActionTypes.SET_SEARCHBAR_VALUE:
      return {
        ...state,
        searchbarValue: action.payload,
      };

    default:
      return state;
  }
};

export default uiReducer;
