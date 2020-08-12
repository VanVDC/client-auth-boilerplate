import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps //formProps has our email and password
    );

    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    localStorage.setItem("token", response.data.token); //set the token in localstorage for persisten so refeshing won't make it disappear
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

//signin action
export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps //formProps has our email and password
    );

    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    localStorage.setItem("token", response.data.token); //set the token in localstorage for persisten so refeshing won't make it disappear
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: "",
  };
};
