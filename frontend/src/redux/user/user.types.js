export const UserActionTypes = {
  RESET_USER_REDUX: "RESET_USER_REDUX",
  SET_USER_AUTH: "SET_USER_AUTH",
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

export const INITIAL_STATE = {
  userAuth: null,
  currentUser: {
    _id: "",
    _cls: "",
    email: "",
    fname: "",
    lname: "",
    reviews: [],
    restaurants: [],
  },
};
