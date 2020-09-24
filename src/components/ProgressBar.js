import React from 'react'

export const ProgressBar = (props) => {
   return (
      <div className="progress push">
         <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${props.percentage}%` }}
            aria-valuenow={props.percentage} aria-valuemin={0} aria-valuemax={100}>
            <span className="font-size-sm font-w600">{props.percentage}%</span>
         </div>
      </div>
   )
}

export default ProgressBar