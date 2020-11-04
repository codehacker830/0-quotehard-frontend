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

export const validatePassword = (password) => {
   let error = "";

   if (!password) {
      error = "Please enter a password.";
   } else if (password.length < 6) {
      error = "Your password needs to be at least 6 characters long.";
   }

   return error;
};
