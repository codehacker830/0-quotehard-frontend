import React from 'react'
import { Link } from 'react-router-dom'
import { allActivities } from '../constants/Dump';

export const StatusBanner = (props) => {
   const [showActivity, setShowActivity] = React.useState(false);
   return (
      <div className="bg-body-light border-bottom">
         <div className="container">
            {/* status */}
            <div className="row">
               <div className="bg-white p-4 mb-3 maxWidth-200 mr-2">
                  <div className="font-size-h2 mb-1">Sent</div>
                  <div className="text-muted">September 7, 2020</div>
               </div>
               <div className="p-4 mb-3 maxWidth-200 mr-2">
                  <div className="font-size-h4 mb-1 text-success text-center">Opens</div>
                  <div className="font-size-h2 font-w600 text-success text-center">2</div>
               </div>
               <div className="p-4 mb-3 maxWidth-200 mr-2">
                  <div className="font-size-h4 mb-1 text-success text-center">Q&A</div>
                  <div className="font-size-h2 font-w600 text-success text-center">1</div>
               </div>
               <div className="p-4 mb-3 maxWidth-200 mr-2">
                  <div className="font-size-h4 mb-1 text-success text-center">Notes</div>
                  <div className="font-size-h2 font-w600 text-success text-center">1</div>
               </div>
               <div className="px-4 ml-auto my-auto">
                  <Link to={{
                     pathname: "/q/C.xOH0nfW9bvohXqbDYoz-gofQEUST17fH7aavLnK0g",
                     state: {
                        mode: "preview"
                     }
                  }}>Preview as Your Customer</Link>
               </div>
            </div>

            {/* All activity */}
            <div className="row py-2">
               <div className="font-size-sm mb-1 px-4">
                  <div>
                     <i className="far fa-xs fa-clock mr-1"></i>
                        All Activity
                        <button className="btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2" onClick={() => setShowActivity(!showActivity)}>{showActivity ? "Hide" : "Show"}</button>
                  </div>

               </div>

               <div className={`w-100 mt-2 ${showActivity ? "" : "d-none"}`}>
                  <table className="table table-sm table-vcenter">
                     <tbody>
                        {
                           allActivities.map((item, ind) => {
                              return (
                                 <tr key={ind}>
                                    <td className="bg-white font-size-sm p-2" style={{ width: "30%" }}>{item.date}</td>
                                    <td className="font-size-sm p-2">{item.content}</td>
                                 </tr>
                              );
                           })
                        }
                     </tbody>
                  </table>
               </div>
            </div>

         </div>
      </div>
   )
}
export default StatusBanner