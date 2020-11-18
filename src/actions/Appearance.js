import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, LOGO_URL } from "../constants/ActionTypes"
import axios from "../util/Api";


export const setlogoURL = (url) => {
   return {
      type: LOGO_URL,
      payload: url
   };
};
export const uploadLogo = (e) => {
   return (dispatch) => {
      dispatch({ type: FETCH_START, payload: LOGO_URL });
      const formData = new FormData();
      const selectedFile = e.target.files[0];
      formData.append(
         "image",
         selectedFile
      );
      console.log("selectedFile --->", selectedFile);
      console.log("formData --->", formData);

      axios.post("/service/upload-logo", formData)
         .then(({ data }) => {
            console.log(" image upload response -->", data);
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: LOGO_URL, payload: data.logoURL });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
            console.log(" image upload err -->", err);
         });
   }
}
export const removeLogo = (logoURL) => {
   console.log("______ logoURL _______", logoURL);
   return (dispatch) => {
      dispatch({ type: FETCH_START, payload: LOGO_URL });
      axios.post("/service/remove-logo", { logoURL })
         .then(({ data }) => {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: LOGO_URL, payload: null });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
         })
   }
}
