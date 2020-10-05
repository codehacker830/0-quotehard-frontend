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

