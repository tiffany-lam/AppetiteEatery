// import { BASE_API_URL, CHAT_SERVER } from "../../utils";
// import axios from "axios";
import { UIActionTypes, INITIAL_STATE } from "./ui.types";

export const resetUiRedux = () => ({
  type: UIActionTypes.RESET_UI,
  payload: INITIAL_STATE,
});

export const setSearchbarValue = (value) => ({
  type: UIActionTypes.SET_SEARCHBAR_VALUE,
  payload: value,
});
