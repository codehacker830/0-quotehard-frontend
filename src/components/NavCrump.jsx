import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const NavCrump = (props) => {
   const [show, setShow] = useState(false);
   // const actionsContainer = useRef(null);

   const onClickOutsideHandler = (ev) => {
      console.log("show ===", show);
      // if (!actionsContainer.current.contains(ev.target)) setShow(false);
   }
   
   useEffect(() => {
      // window.addEventListener('click', onClickOutsideHandler);
      // return () => {
      //    window.removeEventListener('click', onClickOutsideHandler);
      // };
   }, []);
   return (
      <div className="bg-body-light border-top border-bottom">
         <div className="content content-full py-3">
            {
               props.linkTo ?
                  <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                     <h1 className="flex-sm-fill font-size-sm text-uppercase font-w700 mt-2 mb-0 mb-sm-2">
                        <Link to={props.linkTo}>
                           <i className="fa fa-arrow-left fa-fw mr-2" />
                           <span className="text-primary">{props.children}</span>
                        </Link>
                     </h1>

                     {/* <div className="dropdown d-inline-block show" ref={actionsContainer}>
                        <button type="button" className="btn btn-dual" onClick={() => setShow(!show)}>
                           <span className="text-primary">Actions</span>
                           <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
                        </button>

                        <div className={`dropdown-menu dropdown-menu-right p-0 ${show ? "show" : ""}`} style={{ minWidth : 250}}>
                           <ul className="nav-items my-0 py-1">
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Mark as Sent(don't email)</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-copy text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Copy</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-plus-circle text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Copy to Template</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
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
                     </div> */}

                  </div>
                  : props.children
            }
         </div>
      </div>
   )
}

export default NavCrump