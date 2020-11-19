import { APPEARANCE_SETTINGS, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, LOGO_URL } from "../constants/ActionTypes"
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
            dispatch({ type: LOGO_URL, payload: data.logo });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
            console.log(" image upload err -->", err);
         });
   }
}
export const removeLogo = (logo) => {
   console.log("______ logo _______", logo);
   return (dispatch) => {
      dispatch({ type: FETCH_START, payload: LOGO_URL });
      axios.post("/service/remove-logo", { logo })
         .then(({ data }) => {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: LOGO_URL, payload: null });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
         })
   }
}

export const getAppearanceSettings = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START, payload: APPEARANCE_SETTINGS });
      axios.get("/settings/appearance")
         .then(({ data }) => {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: APPEARANCE_SETTINGS, payload: { ...data } });
         })
         .catch((err) => {
            dispatch({ type: FETCH_ERROR });
         })
   }
}
