import React from 'react'
import { alterTypeVariableStr, deriveAddressStr } from '../../../util';

export const AddressesShow = (props) => {
   return (
      <React.Fragment>
         {
            props.addresses.map((item, index) => {
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