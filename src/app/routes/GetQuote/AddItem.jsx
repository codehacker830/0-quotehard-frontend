import React from 'react'

export const AddItem = (props) => {
   return (
      <div className="row py-4">
         <div className="col-12">
            <button type="button" className="btn btn-alt-light">
               <i className="fa fa-plus mr-1"></i>
               Add Item
            </button>
         </div>
      </div>
   )
}

export default AddItem