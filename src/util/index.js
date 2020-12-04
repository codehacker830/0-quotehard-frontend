import { toast } from 'react-toastify';

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
      const month = dtObj.getMonth() + 1;
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
   if (isValidDateObj(dObj)) return dObj;
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

export const checkIfTeamMember = (authUser, teamMembers) => {
   if (!authUser) return false;
   console.log("teamMembersteamMembers =", teamMembers);

   if (!teamMembers.length) return false;
   const val = teamMembers.find((member) => member._id === authUser._id);
   if (val) return true;
   else return false;
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

export const SwitchQuoteItemClass = (item) => {
   let classStr = "";
   if (item.category === "priceItem") {
      classStr = "tItem vIsLine";
      const { priceItem } = item;
      if (priceItem.isSubscription) classStr += " hasTerm";
      if (priceItem.isOptional) {
         if (priceItem.isOptionSelected) classStr += " isSelected";
      } else if (priceItem.isMultipleChoice) {
         if (priceItem.isChoiceSelected) classStr += " isSelected";
      } else classStr += " isSelected";
   } else if (item.category === "textItem") {
      classStr = "tItem-text"
   } else {                                     // item.category === "subTotal" 
      classStr = "tItem vSubTotal"
   }
   return classStr;
}

export const checkIfHasTerm = (items) => {
   if (!items.length) return false;
   const frs = items.filter(item => {
      if (item.category === "priceItem") {
         const { isSubscription } = item.priceItem;
         if (isSubscription) return true;
         else return false;
      }
      else return false;
   });
   if (frs.length > 0) return true;
   else return false;
}

export const numberOfOption = (items) => {
   if (!items.length) return { total: null, selected: null };
   else {
      let total = 0;
      let selected = 0;
      items.forEach(item => {
         if (item.category === "priceItem") {
            const { priceItem } = item;
            if (priceItem.isOptional || priceItem.isMultipleChoice) {
               total++;
               if (priceItem.isOptionSelected || priceItem.isChoiceSelected) selected++;
            }
         }
      });
      return { total, selected };
   }
}

// function onlyUnique(value, index, self) {
//    return self.indexOf(value) === index;
// }
function getUniqueTaxArr(taxArr) {
   if (!Array.isArray(taxArr)) return [];
   const resArr = [];
   taxArr.forEach((tax) => {
      const i = resArr.findIndex(x => x._id == tax._id);
      if (i <= -1 && tax.taxRate != 0) {
         resArr.push(tax);
      }
   });
   return resArr;
}

function checkIfItemWasSelected(priceItem) {
   if ((priceItem.isOptional && priceItem.isOptionSelected)
      || (priceItem.isMultipleChoice && priceItem.isChoiceSelected)) {
      return true;
   } else if (!priceItem.isOptional && !priceItem.isMultipleChoice) {
      return true;
   }
   else return false;
}

export const differentTaxIdArrGroup = (items) => {
   if (!items.length) return [];
   let resArr = [];
   items.forEach(item => {
      if (item.category === "priceItem") {
         const { priceItem } = item;
         if (checkIfItemWasSelected(priceItem)) {
            if (priceItem.tax) resArr.push(priceItem.tax);
         }
      }
   });
   return getUniqueTaxArr(resArr);
}

export const filterItemArrForTaxId = (items, taxId) => {
   if (!items.length) return [];
   let resArr = [];
   items.forEach(item => {
      if (item.category === "priceItem") {
         const { priceItem } = item;
         if (priceItem.tax._id == taxId) {
            if (checkIfItemWasSelected(priceItem)) resArr.push(item);
         }
      }
   });
   return resArr;
}

export const subTotalHasNoTerm = (items, settings) => {
   if (!items.length) return 0;
   let subTotal = 0;
   items.forEach(item => {
      if (item.category === "priceItem") {
         const { priceItem } = item;
         if (!priceItem.isSubscription) {
            if (priceItem.isOptional && priceItem.isOptionSelected) {

            }
            if (priceItem.isMultipleChoice && priceItem.isChoiceSelected) {

            }
         }
      }
   });
   return subTotal;
}

export const ToastErrorNotification = (errors) => {
   const errKeys = Object.keys(errors);
   errKeys.map(err => {
      const errMsg = `${err} ${errors[err]}`;
      toast.error(errMsg.charAt(0).toUpperCase() + errMsg.slice(1))
   });
}



////////  for SubTotal

export const FilterSeqItemsForPartSubTotal = (items, ind) => {
   console.log('items', items)
   if (ind < 1) return [];
   let startInd = null;
   for (let i = ind - 1; i >= 0; i--) {
      if (items[i].category === "subTotal") break;
      if (items[i].category === "priceItem") {
         startInd = i;
         break;
      }
   }
   console.log('startInd', startInd)
   if (startInd === null) return [];

   const firstPriceItem = items[startInd];
   console.log('firstPriceItem', firstPriceItem)

   const {
      isSubscription,
      per,
      every,
      period,
   } = firstPriceItem.priceItem;
   let resArr = [];
   let seq = true;
   for (let i = startInd; i >= 0; i--) {
      if (seq === false) break;
      if (items[i].category === "subTotal") break;
      if (items[i].category === "priceItem") {
         const { priceItem } = items[i];
         if (isSubscription) {
            if (true == priceItem.isSubscription
               && per == priceItem.per
               && every == priceItem.every
               && period == priceItem.period) resArr.push({ ...items[i] });
            else seq = false;
         } else {
            if (false == priceItem.isSubscription) resArr.push({ ...items[i] });
            else seq = false;
         }
      }
   }
   return resArr;
}

export const calculateTotalForItems = (items) => {
   if (!items.length) return 0;
   let total = 0;
   for (let i = 0; i < items.length; i++) {
      if (items[i].category === "priceItem") {
         const { priceItem } = items[i];
         if (priceItem.isOptional || priceItem.isMultipleChoice) {
            if (priceItem.isOptional && priceItem.isOptionSelected) total += items[i].priceItem.itemTotal;
            else if (priceItem.isMultipleChoice && priceItem.isChoiceSelected) total += items[i].priceItem.itemTotal;
         }
         else total += items[i].priceItem.itemTotal;
      }
   }
   return total;
}