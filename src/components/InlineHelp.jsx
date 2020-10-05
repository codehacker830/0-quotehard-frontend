import React from 'react'

export const InlineHelp = (props) => {
   return (
      <h3 className="text-gray font-w400 p-5">
         {props.children}
      </h3>
   )
}

export default InlineHelp