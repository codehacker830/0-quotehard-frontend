import React, { useEffect, useRef, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import NavCrumpLeft from './NavCrumpLeft';
import qs from 'qs';
import clsx from 'clsx';

const NavCrump = (props) => {
   const queryObj = qs.parse(props.location.search, { ignoreQueryPrefix: true });
   const { merge_loser } = queryObj;
   const isMergeMode = merge_loser ? true : false;

   return (
      <div className={clsx("bg-white border-top border-bottom", isMergeMode && "d-none")}>
         <div className="content content-full py-3">
            <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
               {
                  props.linkTo ?
                     <NavCrumpLeft linkTo={props.linkTo}>{props.children}</NavCrumpLeft>
                     : props.children
               }
            </div>
         </div>
      </div >
   )
}

export default withRouter(NavCrump)