import React from 'react'
import { alterTypeVariableStr } from '../../../util';

const deriveAddressStr = (item) => {
   let content = "";
   const { street, stateOrRegion, city, postCode, country } = item;
   if (street) content += street;
   if (stateOrRegion) content += (content ? `, ${stateOrRegion}` : stateOrRegion);
   if (city) content += (content ? `, ${city}` : city);
   if (postCode) content += (content ? ` ${postCode}` : postCode);
   if (country) content += (content ? `, ${country}` : country);
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