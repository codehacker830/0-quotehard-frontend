import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS,
   INIT_URL,
   SHOW_MESSAGE,
   SIGNOUT_USER_SUCCESS,
   USER_DATA,
   USER_TOKEN_SET
} from "../constants/ActionTypes";
import { history } from "../store";
import axios from '../util/Api'

export const setInitUrl = (url) => {
   return {
      type: INIT_URL,
      payload: url
   };
};

export const getUser = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/account',
      ).then(({ data }) => {
         console.log("get User res: ", data);
         if (data.account) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
         } else {
            dispatch({ type: FETCH_ERROR, payload: data.error });
            dispatch({ type: SIGNOUT_USER_SUCCESS });
         }
      }).catch(function (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });

         console.log("Error****:", error.message);
         dispatch({ type: SIGNOUT_USER_SUCCESS });
      });
   }
};

export const userSignIn = ({ email, password }) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      // dispatch({ type: USER_TOKEN_SET, payload: null });
      // dispatch({ type: USER_DATA, payload: null });
      axios.post('/account/login', {
         email: email,
         password: password,
      }
      ).then(({ data }) => {
         if (data.account) {
            localStorage.setItem("token", JSON.stringify(data.access_token));
            axios.defaults.headers.common['access-token'] = "Bearer " + data.access_token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
         } else {
            console.log(" User Sign In error ========> ", data);
            dispatch({ type: FETCH_ERROR, payload: data.error });
         }
      }).catch((error) => {
         // if(error.response.status === 422) dispatch({ type: FETCH_ERROR, payload: "Email or password is invalid." });
         // else 
         dispatch({ type: FETCH_ERROR, payload: "Invalid credentials." });
         console.log("Error****:", error.message);
      });
   }
};

export const userSignUp = ({ firstName, lastName, email, password, companyName, location }) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/account', {
         firstName,
         lastName,
         email,
         password,
         companyName,
         location
      }
      ).then(({ data }) => {
         if (data.account) {
            localStorage.setItem("token", JSON.stringify(data.access_token));
            axios.defaults.headers.common['access-token'] = "Bearer " + data.access_token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
         } else {
            console.log("payload: data.error", data.error);
            dispatch({ type: FETCH_ERROR, payload: "Network Error" });
         }
      }).catch(function (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      });
   }
};

export const userSignOut = () => {
   return (dispatch) => {
      localStorage.removeItem("token");
      dispatch({ type: SIGNOUT_USER_SUCCESS });
      // dispatch({ type: FETCH_START });
      // axios.get('/account/logout',
      // ).then(({ data }) => {
      //    if (data.status === "success") {
      //       localStorage.removeItem("token");
      //       dispatch({ type: FETCH_SUCCESS });
      //       dispatch({ type: SIGNOUT_USER_SUCCESS });
      //    } else {
      //       dispatch({ type: FETCH_ERROR, payload: data.error });
      //    }
      // }).catch(function (error) {
      //    dispatch({ type: FETCH_ERROR, payload: error.message });
      //    console.log("Error****:", error.message);
      // });
   }
};

export const userUpdate = ({ firstName, lastName, email, image, password }) => {
   console.log(firstName, lastName, email, image, password);
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/account', { firstName, lastName, email, image, password }
      ).then(({ data }) => {
         console.log("data:", data);
         if (data.account) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
         } else {
            console.log("payload: data.error", data.error);
            dispatch({ type: FETCH_ERROR, payload: "Network Error" });
         }
      }).catch(function (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      });
   }
};

export const userResetPassword = ({ entoken, password }) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      // dispatch({ type: USER_TOKEN_SET, payload: null });
      // dispatch({ type: USER_DATA, payload: null });
      axios.post('/reset-password', { entoken, password }
      ).then(({ data }) => {
         console.log(" asldfjasdlfjalsd ", data);
         if (data.isValid) {
            localStorage.setItem("token", JSON.stringify(data.access_token));
            axios.defaults.headers.common['access-token'] = "Bearer " + data.access_token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
            location.replace('/app');

         } else {
            console.log(" User Reset password error ========> ", data);
            dispatch({ type: FETCH_ERROR, payload: data.message });
            location.replace('/request-password/new/expired');
         }
      }).catch((error) => {
         dispatch({ type: FETCH_ERROR, payload: "Your password needs to be at least 6 characters long." });
         dispatch({ type: SHOW_MESSAGE, payload: error.message })
         console.log("Error****:", error.message);
      });
   }
}