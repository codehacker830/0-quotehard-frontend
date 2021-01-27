
import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS,
   EMAIL_NOTIFICATION_SETTING
} from "../constants/ActionTypes";
import axios from '../util/Api'

export const updateEmailNotificationSetting = (payload) => {
   return async (dispatch) => {
      dispatch({ type: EMAIL_NOTIFICATION_SETTING, payload: payload });
   }
}