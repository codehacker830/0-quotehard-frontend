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