import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NavCrumpLeft from './NavCrumpLeft';

export const NavCrump = (props) => {
   return (
      <div className="bg-body-light border-top border-bottom">
         <div className="content content-full py-3">
            <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
               {
                  props.linkTo ? <NavCrumpLeft linkTo={props.linkTo}>{props.children}</NavCrumpLeft>
                  : props.children
               }
            </div>
         </div>
      </div>
   )
}

export default NavCrump