import { UserActionTypes, INITIAL_STATE } from "./user.types";
import { BASE_API_URL } from "../../utils";
import axios from "axios";

export const resetUserRedux = () => ({
  type: UserActionTypes.RESET_USER_REDUX,
  payload: INITIAL_STATE,
});

export const setUserAuth = (user) => ({
  type: UserActionTypes.SET_USER_AUTH,
  payload: user,
});

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const updateCurrentUser = (userID) => {
  return (dispatch) => {
    axios
      .get(`${BASE_API_URL}/user/${userID}`)
      .then((res) => {
        dispatch(setCurrentUser(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
