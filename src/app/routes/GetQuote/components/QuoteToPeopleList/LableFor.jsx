import React from 'react'
import { useSelector } from 'react-redux'

export const LableFor = () => {
   const toPeopleList = useSelector(state => state.mainData.quote.toPeopleList);

   if (toPeopleList.length === 0) return <label htmlFor="emailTo" className="text-gray fa-xs">Start with a name or email</label>
   else return <label htmlFor="emailTo" className="text-gray fa-xs">Add another… start with a name or email</label>
}
export default LableFor;