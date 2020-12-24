import { QUOTE_DEFAULT_SETTING, FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from "../constants/ActionTypes"
import axios from "../util/Api";

export const getQuoteDefaultSetting = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START, payload: QUOTE_DEFAULT_SETTING });
      try {
         const { data } = await axios.get("/settings/quote-default");
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: QUOTE_DEFAULT_SETTING, payload: data.quoteDefaultSetting });
      } catch (err) {
         dispatch({ type: FETCH_ERROR });
      }
   }
}

export const updateQuoteDefaultSetting = (setting) => {
   return (dispatch) => dispatch({ type: QUOTE_DEFAULT_SETTING, payload: setting });
}

export const publishQuoteDefaultSetting = (setting) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put("/settings/quote-default", { setting });
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: QUOTE_DEFAULT_SETTING, payload: data.quoteDefaultSetting });
      } catch (err) {
         console.error("err during publish quoteDefaultSetting.")
         dispatch({ type: FETCH_ERROR });
      }
   }
}