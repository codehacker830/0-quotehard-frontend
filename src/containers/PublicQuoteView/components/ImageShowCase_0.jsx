import React from 'react'

export const ImageShowCase = (props) => {
   return (
      <div className="quoteFile-set">
         {
            props.files.map((file, ind) => (
               <div className="quoteFile-image" key={ind}>
                  <img src={file} alt="..." />
               </div>
            ))
         }
      </div>
   )
}

export default ImageShowCase