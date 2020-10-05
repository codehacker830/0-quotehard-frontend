import React from 'react'
import { alterTypeVariableStr } from '../../../util';

export const PhonesShow = (props) => {
   return (
      <>
         {
            props.phones.map((item, index) => {
               return (
                  <div className="mb-1" key={index}>
                     <span className="text-gray fa-xs text-uppercase">{alterTypeVariableStr(item.category)}</span>
                     <span className="d-block text-black">{item.content}</span>
                  </div>
               );
            })
         }
      </>
   )
}

export default PhonesShow