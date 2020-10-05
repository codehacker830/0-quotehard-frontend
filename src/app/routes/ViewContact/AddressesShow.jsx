import React from 'react'
import { alterTypeVariableStr } from '../../../util';

export const AddressesShow = (props) => {
   return (
      <>
         {
            props.addresses.map((item, index) => {
               return (
                  <div className="mb-1" key={index}>
                     <span className="text-gray fa-xs text-uppercase">{alterTypeVariableStr(item.category)}</span>
                     <span className="d-block text-black">
                        {item.street}, {item.stateOrRegion}, {item.city} {item.postCode}, {item.country}
                     </span>
                  </div>
               );
            })
         }
      </>
   )
}

export default AddressesShow