import React from 'react'
import { Link } from 'react-router-dom'

export const NavCrump = (props) => {
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
                  </div>
                  : props.children
            }
         </div>
      </div>
   )
}

export default NavCrump