import React from 'react'
import { alterTypeVariableStr } from '../../../util';

const deriveAddressStr = (item) => {
   let content = "";
   const { street, stateOrRegion, city, postCode, country } = item;
   if (typeof street !== "undefined" && street !== "") content += street;
   if (typeof stateOrRegion !== "undefined" && stateOrRegion !== "") content += content ? ", " : "" + stateOrRegion;
   if (typeof city !== "undefined" && city !== "") content += content ? ", " : "" + city;
   if (typeof postCode !== "undefined" && postCode !== "") content += content ? " " : "" + postCode;
   if (typeof country !== "undefined" && country !== "") content += content ? ", " : "" + country;

   return content;
}

export const AddressesShow = (props) => {
   return (
      <React.Fragment>
         {
            props.addresses.map((item, index) => {
               console.log("item : ", item)
               console.log("deriveAddressStr(item) : ", deriveAddressStr(item))
               return (
                  <div className="mb-1" key={index}>
                     <span className="text-gray fa-xs text-uppercase">{alterTypeVariableStr(item.category)}</span>
                     <span className="d-block text-black">{deriveAddressStr(item)}</span>
                  </div>
               );
            })
         }
      </React.Fragment>
   )
}

export default AddressesShow