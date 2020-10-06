import React from 'react'

export const TotalLabelFor = (props) => {
   if (props.list && props.list.length)
      return (
         <div className="p-4">
            <span>Total {props.list.length}</span>
         </div>
      );
   else return null;
}

export default TotalLabelFor