import React from 'react'

export const TotalLabelFor = (props) => {
   if (props.list && props.list.length)
      return (
         <div className="px-2 py-3">
            <span>Total {props.list.length}</span>
         </div>
      );
   else return null;
}

export default TotalLabelFor