import { UserActionTypes, INITIAL_STATE } from "./user.types";

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
