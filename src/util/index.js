const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];
export const alterTypeVariableStr = (str) => {
   switch (str) {
      case "primaryPhone":
         return "Primary Phone";
      case "workPhone":
         return "Work Phone";
      case "mobile":
         return "Mobile";
      case "homePhone":
         return "Home Phone";
      case "website":
         return "Website";
      case "skype":
         return "Skype";
      case "twitter":
         return "Twitter";
      case "fax":
         return "Fax";

      case "priamryAddress":
         return "Priamry Address";
      case "postalAddress":
         return "Postal Address";
      case "physicalAddress":
         return "Physical Address";
      default:
         return str;
   }
}

export const parseDate = (dtObj) => {
   if (isValidDateObj(dtObj)) {
      const year = dtObj.getFullYear();
      const month = dtObj.getMonth();
      const day = dtObj.getDate();
      console.log("dtObj =>", dtObj)
      console.log("year =>", year);
      console.log("month =>", month);
      console.log("day =>", day);
      return toDateString(year) + "/" + toDateString(month) + "/" + toDateString(day);
   }
   else return "";
}
export const parseTime = (dtObj) => {
   if (isValidDateObj(dtObj)) {
      const hours = dtObj.getHours();
      const minutes = dtObj.getMinutes();
      return toDateString(hours) + ":" + toDateString(minutes);
   }
   else return "";
}

export const convertStrIntoDateObj = (date, time) => {
   const dObj = new Date(date + " " + time);
   if (isValidDate) return dObj;
   return null;
}
export const isValidDateTimeFormat = (date, time) => {
   const dObj = new Date(date + " " + time);
   return isValidDateObj(dObj);
}

export const isValidDateObj = (dd) => {
   return dd instanceof Date && !isNaN(dd);
}

const toDateString = (num) => {
   let str = num.toString();
   if (parseInt(num) < 10) str = "0" + str;
   return str;
}

export const toFixedFloat = (dt) => {
   return parseFloat(dt).toFixed(2)
}

export const countDecimals = (num) => {
   if (Math.floor(num.valueOf()) === num.valueOf()) return 0;
   return num.toString().split(".")[1];
}

export const caculateTotalTax = (pItemArr) => {
   let totalTax = 0;
   return totalTax;
}

export const formatDate = (date) => {
   if (!date) return "";
   else {
      const dtObj = new Date(date);
      if (isValidDateObj(dtObj)) {
         const year = dtObj.getFullYear();
         const monthName = monthNames[dtObj.getMonth()];
         const day = dtObj.getDate();
         return monthName + " " + day + ", " + year;
      }
      else return "";
   }
}

export const formatDateTime = (date) => {
   if (!date) return "";
   else {
      const dtObj = new Date(date);
      if (isValidDateObj(dtObj)) {
         const year = dtObj.getFullYear();
         const monthName = monthNames[dtObj.getMonth()];
         const day = dtObj.getDate();
         const hour = dtObj.getHours();
         const minutes = dtObj.getMinutes();
         return monthName + " " + day + ", " + year + " at " + hour + ":" + minutes;
      }
      else return "";
   }
}

export const switchHeadingFont = (value) => {
   switch (value) {
      case "0":
         return "Helvetica";
      case "1":
         return "Tahoma";
      case "2":
         return "Georgia";
      case "3":
         return "Times";
      default:
         return "Helvetica";
   }
}
export const SwitchLogoLayoutClass = (contactDetailLayout, layout) => {
   if (parseInt(contactDetailLayout) != 2)
      switch (parseInt(layout)) {
         case 1:
            return "quote-logo quote-logo-top quote-logo-center";
         case 2:
            return "quote-logo quote-logo-top quote-logo-right";
         default:
            return "quote-logo quote-logo-top quote-logo-left";
      }
   else return "quote-logo quote-logo-x-legacy  quote-logo-x-legacy-top";
}

export const SwitchQuoteLayoutClass = (contactDetailLayout, layout) => {
   if (parseInt(contactDetailLayout) == 0) return "container qCustomCss quoteCanvas quoteCanvas-1col";
   else if (parseInt(contactDetailLayout) == 1) {
      switch (parseInt(layout)) {
         case 0:
            return "container qCustomCss quoteCanvas quoteCanvas-1col";
         case 1:
            return "container qCustomCss quoteCanvas quoteCanvas-1col quote-layout-center";
         default:
            return "container qCustomCss quoteCanvas quoteCanvas-1col";
      };
   }
   else {
      switch (parseInt(layout)) {
         case 0:
            return "container qCustomCss quoteCanvas quoteCanvas-2col";
         case 1:
            return "container qCustomCss quoteCanvas quoteCanvas-2col quote-layout-center";
         default:
            return "container qCustomCss quoteCanvas quoteCanvas-2col";
      };
   }
}
export const checkIfTeamMember = (authUser, teamMembers) => {
   if (!authUser) return false;
   if (teamMembers.length === 0) return false;
   const val = teamMembers.find((member) => member._id === authUser._id);
   if (val) return true;
   else return false;
}