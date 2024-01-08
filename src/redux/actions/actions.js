import axios from "axios";
import { addAllInfo, addUser } from "../reducers/reducers";

const localurl = "http://localhost:8080/api";

//contador
export const fetchCounter = (data) => (dispatch) => {
  
  axios
    .put(`${localurl}/`, {data})
    .then((response) => {
      if (response.status === 200) {
        console.log("all ok");
      }
      dispatch(addAllInfo(response.data))
    })
    .catch((error) => {
      console.error("Error while posting name:", error);
      
    });
};

//sign in // FUNCIONA
export const fetchSignIn = (name) => (dispatch) => {
  axios
    .post(`${localurl}/`, { username: name })
    .then((response) => {
      if (response.status === 200) {
        dispatch(addUser(name));
      } else {
        console.log("User already exists");
      }
    })
    .catch((error) => {
      console.error("Error while posting name:", error);
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    });
};

//log in
export const fetchLogin = (name) => (dispatch) => {
  axios
    .get(`${localurl}/user`,{ params: {username: name}})
    .then((response) => {
      if (response.status === 200) {
        console.log("login ok");
        
        dispatch(addAllInfo(response.data));
      }
    })
    .catch((error) => {
      console.error("Error while login:", error);
    });
};
