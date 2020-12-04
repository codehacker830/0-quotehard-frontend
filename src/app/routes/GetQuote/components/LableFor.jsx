import React from 'react'
import { connect } from 'react-redux'

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
const mapStateToProps = ({ mainData }) => {
   const { toPeopleList } = mainData.quote;
   return { toPeopleList };
};
export default connect(mapStateToProps)(LableFor);