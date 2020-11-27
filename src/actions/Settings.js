import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_SALES_CATEGORIES,
   GET_SALES_TAXES,
   GET_DEFAULT_SALES_CATEGORY,
   GET_DEFAULT_SALES_TAX
} from '../constants/ActionTypes';

export const getDefaultSalesCategory = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get('/settings/default/sales-category');
         console.log(" sales default salescategory api res : ", data);
         dispatch({ type: FETCH_SUCCESS });
         const { defaultSalesCategory } = data;
         dispatch({ type: GET_DEFAULT_SALES_CATEGORY, payload: defaultSalesCategory });
         dispatch({ type: GET_DEFAULT_SALES_TAX, payload: defaultSalesTax });
      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);

      }
   }
}
export const getDefaultSalesTax = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get('/settings/default/sales-tax');
         console.log(" sales default salestax api res : ", data);
         dispatch({ type: FETCH_SUCCESS });
         const { defaultSalesTax } = data;
         dispatch({ type: GET_DEFAULT_SALES_TAX, payload: defaultSalesTax });
      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);

      }
   }
}
export const getSalesCategories = (status) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/settings/sales-categories/${status}`);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_SALES_CATEGORIES, payload: data.categories });
      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      }
   }
}


export const getSalesTaxes = (status) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/settings/sales-taxes/${status}`);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_SALES_TAXES, payload: data.taxes });

      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      }
   }
}