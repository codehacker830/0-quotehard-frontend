
import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS,
   INIT_URL,
   SHOW_MESSAGE,
   SIGNOUT_USER_SUCCESS,
   AUTH_USER_DATA,
   ACCOUNT_COMPANY_DATA,
   PERSON_DATA,
   USER_TOKEN_SET,
   EMAIL_NOTIFICATION_SETTING
} from "../constants/ActionTypes";
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
         const token = JSON.parse(localStorage.getItem('token'));
         if (token) axios.defaults.headers.common['Authorization'] = "Bearer " + token;
         const { data } = await axios.get('/account');
         console.log("get User res => : ", data);
         dispatch({ type: AUTH_USER_DATA, payload: data.account });
         dispatch({ type: ACCOUNT_COMPANY_DATA, payload: data.accountCompany });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         localStorage.clear();
         dispatch({ type: SIGNOUT_USER_SUCCESS });
         dispatch({ type: FETCH_ERROR, payload: "Token expired." });
      }
   }
};


export const updateEmailNotificationSetting = (payload) => {
   return async (dispatch) => {
      dispatch({ type: EMAIL_NOTIFICATION_SETTING, payload: payload });
   }
}