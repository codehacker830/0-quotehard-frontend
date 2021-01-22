import { toast } from "react-toastify";
import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS,
   INIT_URL,
   SHOW_MESSAGE,
   SIGNOUT_USER_SUCCESS,
   USER_DATA,
   COMPANY_DATA,
   PERSON_DATA,
   USER_TOKEN_SET,

} from "../constants/ActionTypes";
import { ToastErrorNotification } from "../util";
import axios from '../util/Api'

export const setInitUrl = (url) => {
   return {
      type: INIT_URL,
      payload: url
   };
};

export const getUser = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get('/account');
         console.log("get User res => : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: USER_DATA, payload: data.account });
         dispatch({ type: COMPANY_DATA, payload: data.accountCompany });
      } catch (err) {
         localStorage.clear();
         dispatch({ type: SIGNOUT_USER_SUCCESS });
         dispatch({ type: FETCH_ERROR, payload: "Token expired." });
         toast.success('Session expired. Please login again.');
      }
   }
};

export const userSignIn = ({ email, password, isRemember }) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/account/login', { email, password, isRemember }
      ).then(({ data }) => {
         localStorage.setItem("token", JSON.stringify(data.access_token));
         axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
         dispatch({ type: USER_DATA, payload: data.account });
      }).catch((err) => {
         // if(error.response.status === 422) dispatch({ type: FETCH_ERROR, payload: "Email or password is invalid." });
         // console.log("Error****:", err.message);
         dispatch({ type: FETCH_ERROR, payload: "Error during login request." });
         if (err.response.status === 422) {
            const { errors } = err.response.data;
            if (errors) ToastErrorNotification(errors);
         }
      });
   }
};

export const userSignUp = (payload) => {
   const { firstName, lastName, email, password, companyName, location } = payload;
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/account', {
         firstName,
         lastName,
         email,
         password,
         companyName,
         location
      }).then(({ data }) => {
         localStorage.setItem("token", JSON.stringify(data.access_token));
         axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
         dispatch({ type: USER_DATA, payload: data.account });
      }).catch((err) => {
         dispatch({ type: FETCH_ERROR, payload: "Error duing account registeration request." });
         console.log("Error****:", err);
         console.log("err.response****:", err.response);
         console.log("err.response.data****:", err.response.data);
         if (err.response.status === 422) {
            const { errors } = err.response.data;
            if (errors) ToastErrorNotification(errors);
         }
      });
   }
};



export const userSignUpByInvitation = ({ _id, accountCompany, firstName, lastName, email, password, history }) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.post('/account/invited', { _id, accountCompany, firstName, lastName, email, password }
      ).then(({ data }) => {
         if (data.account) {
            localStorage.setItem("token", JSON.stringify(data.access_token));
            axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
            history.push('/app');
         } else {
            console.log("payload: data.error", data.error);
            dispatch({ type: FETCH_ERROR, payload: "Network Error" });
         }
      }).catch(function (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
         const { errors } = err.response.data;
         console.log("Error****:", err.response.data);
         dispatch({ type: FETCH_ERROR, payload: err.response.data });
         ToastErrorNotification(errors);
      });
   }
};

export const userSignOut = () => {
   return (dispatch) => {
      localStorage.clear();
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
      }).catch(function (err) {
         console.log("Error****:", err.message);
         dispatch({ type: FETCH_ERROR, payload: err.message });
         const { errors } = err.response.data;
         console.log("Error****:", err.response.data);
         dispatch({ type: FETCH_ERROR, payload: err.response.data });
         ToastErrorNotification(errors);
      });
   }
};

export const userResetPassword = ({ entoken, password }, ownProps) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      // dispatch({ type: USER_TOKEN_SET, payload: null });
      // dispatch({ type: USER_DATA, payload: null });
      axios.post('/reset-password', { entoken, password }
      ).then(({ data }) => {
         if (data.isValid) {
            localStorage.setItem("token", JSON.stringify(data.access_token));
            axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_TOKEN_SET, payload: data.access_token });
            dispatch({ type: USER_DATA, payload: data.account });
            ownProps.history.push('/app');
         } else {
            console.log(" User Reset password error ========> ", data);
            dispatch({ type: FETCH_ERROR, payload: data.message });
            ownProps.history.push('/request-password/new/expired');
         }
      }).catch((err) => {
         console.log("User Reset password Error****:", err.message);
         const { errors } = err.response.data;
         console.log("Error****:", err.response.data);
         dispatch({ type: FETCH_ERROR, payload: err.response.data });
         ToastErrorNotification(errors);
      });
   }
}

export const updateAccountInfo = (payload, history) => {
   const { companyName, companyDisplayName, owner, location, timeZone, dateFormat } = payload;
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put('/account-company', { companyName, companyDisplayName, owner, location, timeZone, dateFormat });
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: COMPANY_DATA, payload: data.accountCompany });
         history.push('/app/settings');
      } catch (err) {
         console.log("Error****:", err.response.data);
         dispatch({ type: FETCH_ERROR, payload: err.response.data });
         toast.error('Failed to update account.');
      }
   }
}

export const getPublicViewPersonWithEntoken = () => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.post('/quotes/view-public/person', { entoken });
         console.log("========== Publick overview person =========", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: PERSON_DATA, payload: data.person });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};
