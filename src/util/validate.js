export const validateEmail = (email) => {
   let error = "";
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

   if (!email) {
      error = "Email address cannot be blank.";
   } else if (!regex.test(email)) {
      error = "Email address does not appear to be a valid.";
   }

   return error;
};