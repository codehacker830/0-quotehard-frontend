import React from 'react'

export const LableFor = (props) => {
   return (
      <>
         {
            props.toPeopleList.length === 0 ?
               <label htmlFor="emailTo" className="text-gray fa-xs">Start with a name or email</label>
               : <label htmlFor="emailTo" className="text-gray fa-xs">Add another… start with a name or email</label>
         }
      </>
   )
}

export default LableFor