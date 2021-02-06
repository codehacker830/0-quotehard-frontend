import { toast } from "react-toastify";
import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS
} from "../constants/ActionTypes";
import axios from '../util/Api'

export const sss = (url) => {
   return {
      type: INIT_URL,
      payload: url
   };
};

export const ddd = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get('/account');
         console.log("get User res => : ", data);
         dispatch({ type: AUTH_USER_DATA, payload: data.account });
         dispatch({ type: ACCOUNT_COMPANY_DATA, payload: data.accountCompany });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         localStorage.clear();
         dispatch({ type: SIGNOUT_USER_SUCCESS });
         dispatch({ type: FETCH_ERROR, payload: "Token expired." });
         toast.success('Session expired. Please login again.');
      }
   }
};