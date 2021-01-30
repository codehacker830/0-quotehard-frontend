import clsx from 'clsx';
import React from 'react'
import { useSelector } from 'react-redux'

export default function ExampleIgnoreMessage() {
   const alertMessage = useSelector(state => state.alertMessage);
   const { isExampleIgnoreMessageShow } = alertMessage;
   return (
      <div className={clsx("example-ignore-message", isExampleIgnoreMessageShow ? "" : "isHidden")}
         style={{
            opacity: 1,
            transition: 'all 0.2s ease 0s'
         }}>
         <div className="inner">This is just a preview.</div>
      </div>
   )
}