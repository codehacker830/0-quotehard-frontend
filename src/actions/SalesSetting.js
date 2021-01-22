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
import { toast } from 'react-toastify';

export const getDefaultSalesCategory = () => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get('/settings/sales-category/default');
         console.log(" sales default salescategory api res : ", data);
         dispatch({ type: FETCH_SUCCESS });
         const { defaultSalesCategory } = data;
         dispatch({ type: GET_DEFAULT_SALES_CATEGORY, payload: defaultSalesCategory });
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
         const { data } = await axios.get('/settings/sales-tax/default');
         console.log(" get default sales Category api res : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_DEFAULT_SALES_TAX, payload: data.defaultSalesTax });
      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);

      }
   }
}

export const setSalesCategoryAsDefault = (id) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put('/settings/sales-category/default', { salesCategoryId: id });
         console.log("make default salescategory api res : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_DEFAULT_SALES_CATEGORY, payload: data.defaultSalesCategory });
         toast.success('Sales Category – made default.');
      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
         toast.success('Failed to make default sales category.');

      }
   }
}

export const setSalesTaxAsDefault = (id) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put('/settings/sales-tax/default', { salesTaxId: id });
         console.log(" make default sales Tax api res : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_DEFAULT_SALES_TAX, payload: data.defaultSalesTax });
         toast.success('Sales Tax – made default.');
      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
         toast.success('Failed to make default.');

      }
   }
}

export const getSalesCategories = (status) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/settings/sales-category/status/${status}`);
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
         const { data } = await axios.get(`/settings/sales-tax/status/${status}`);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_SALES_TAXES, payload: data.taxes });

      } catch (error) {
         dispatch({ type: FETCH_ERROR, payload: error.message });
         console.log("Error****:", error.message);
      }
   }
}