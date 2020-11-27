import React from 'react'

export const NavCrumpRight = (props) => {
   return (
      <div className="dropdown d-inline-block show" ref={actionsContainer}>
         <button type="button" className="btn btn-dual" onClick={() => setShow(!show)}>
            <span className="text-primary">Actions</span>
            <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
         </button>

         <div className={`dropdown-menu dropdown-menu-right p-0 ${show ? "show" : ""}`} style={{ minWidth: 250 }}>
            <ul className="nav-items my-0 py-1">
               <li>
                  <button className="dropdown-item media py-2">
                     <div className="mx-3">
                        <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                     </div>
                     <div className="media-body font-size-sm pr-2">
                        <div className="font-w600">Mark as Sent(don't email)</div>
                     </div>
                  </button>
               </li>
               <li>
                  <button className="dropdown-item media py-2">
                     <div className="mx-3">
                        <i className="fa fa-fw fa-copy text-secondary" />
                     </div>
                     <div className="media-body font-size-sm pr-2">
                        <div className="font-w600">Copy</div>
                     </div>
                  </button>
               </li>
               <li>
                  <button className="dropdown-item media py-2">
                     <div className="mx-3">
                        <i className="fa fa-fw fa-plus-circle text-secondary" />
                     </div>
                     <div className="media-body font-size-sm pr-2">
                        <div className="font-w600">Copy to Template</div>
                     </div>
                  </button>
               </li>
               <li>
                  <button className="dropdown-item media py-2">
                     <div className="mx-3">
                        <i className="fa fa-fw fa-trash-alt text-secondary" />
                     </div>
                     <div className="media-body font-size-sm pr-2">
                        <div className="font-w600">Delete</div>
                     </div>
                  </button>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default NavCrumpRight