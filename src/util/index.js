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

export const parseDate = (sentAt) => {
   if (isValidDateObj(sentAt)) {
      const year = sentAt.getFullYear();
      const month = sentAt.getMonth();
      const day = sentAt.getDate();
      return toDateString(year) + "/" + toDateString(month) + "/" + toDateString(day);
   }
   else return "";
}
export const parseTime = (sentAt) => {
   if (isValidDateObj(sentAt)) {
      const hours = sentAt.getHours();
      const minutes = sentAt.getMinutes();
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