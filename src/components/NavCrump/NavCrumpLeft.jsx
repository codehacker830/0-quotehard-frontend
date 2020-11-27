import React from 'react'
import { Link } from 'react-router-dom';

export const NavCrumpLeft = (props) => {
   if (props.linkTo) return (
      <h1 className="flex-sm-fill font-size-sm text-uppercase font-w700 mt-2 mb-0 mb-sm-2">
         <Link to={props.linkTo}>
            <i className="fa fa-arrow-left fa-fw mr-2" />
            <span className="text-primary">{props.children}</span>
         </Link>
      </h1>
   );
   else return null;
}

export default NavCrumpLeft