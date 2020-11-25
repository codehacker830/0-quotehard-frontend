import React from 'react'
import { toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom'
import { allActivities } from '../../constants/Dump';
import { formatDate } from '../../util';
import axios from '../../util/Api';
import { toastErrorConfig, toastSuccessConfig } from '../../util/toastrConfig';

export const StatusBanner = (props) => {
   const [showActivity, setShowActivity] = React.useState(false);
   const onClickSend = () => {
      const payload = {
         quoteId: props.quote._id
      };
      axios.post('/quotes/send', payload)
         .then(({ data }) => {
            toast.success("Quote email was sent.", toastSuccessConfig);
            props.history.push(`/q/${data.entoken}`);
         })
         .catch(err => {
            console.error(" error => ", err);
            toast.error("Failed to send quote.", toastErrorConfig);
         });
   }
   const onClickEditDraft = () => {
      props.history.push(`/app/quote/${props.quote._id}`);
   }
   const onClickArchive = () => {

   }
   return (
      <div className="bg-body-light border-bottom">
         {
            props.quote.status === "draft" ?
               <div className="container">
                  <div className="content p-5">
                     <button type="button" className="btn btn-primary mr-2" onClick={onClickSend}>Send...</button>
                     <button type="button" className="btn btn-outline-secondary" onClick={onClickEditDraft}>Edit Draft</button>
                  </div>
               </div>
               :
               <div className="container">
                  {/* status */}
                  <div className="row">
                     {
                        props.quote.status === "awaiting" &&
                        <div className="bg-white p-4 maxWidth-200 mb-3 mr-2">
                           <div className="font-size-h3 mb-1">Sent</div>
                           <div className="text-muted">{formatDate(props.quote.settings.sentAt)}</div>
                        </div>
                     }
                     {
                        props.quote.status === "accepted" &&
                        <div className="bg-info p-4 maxWidth-200 mb-3 mr-2">
                           <div className="font-size-h3 text-white mb-1">Accepted</div>
                           <div className="text-white">{formatDate(props.quote.settings.sentAt)}</div>
                           <button className="btn btn-sm btn-alt-dark float-left m-1 mr-2" onClick={onClickArchive}>Archive</button>
                        </div>
                     }
                     {
                        props.quote.status === "declined" &&
                        <div className="bg-danger p-4 maxWidth-200 mb-3 mr-2">
                           <div className="font-size-h3 text-white mb-1">Declined</div>
                           <div className="text-white">{formatDate(props.quote.settings.sentAt)}</div>
                           <button className="btn btn-sm btn-alt-dark float-left m-1 mr-2" onClick={onClickArchive}>Archive</button>
                        </div>
                     }
                     <div className="p-4 maxWidth-200 mb-3 mr-2 mt-3">
                        <div className="mb-1 text-warning text-center">Opens</div>
                        <div className="font-size-h1 font-w600 text-warning text-center">{props.quote.openTimes}</div>
                     </div>
                     {
                        !!props.quote.discussions.length &&
                        <div className="p-4 maxWidth-200 mb-3 mr-2 mt-3">
                           <div className="mb-1 text-secondary text-center">Q&A</div>
                           <div className="font-size-h1 font-w600 text-secondary text-center">{props.quote.discussions.length}</div>
                        </div>
                     }
                     {
                        !!props.quote.notes.length &&
                        <div className="p-4 maxWidth-200 mb-3 mr-2 mt-3">
                           <div className="mb-1 text-success text-center">Notes</div>
                           <div className="font-size-h1 font-w600 text-success text-center">{props.quote.notes.length}</div>
                        </div>
                     }

                     <div className="px-4 ml-auto my-auto">
                        {/* <Link to={{
                     pathname: `/q/NDgVC1jaJlnZI1NAHgj5QdCvg4ZgP7qLNaYinjzg8rM`,
                     state: {
                        mode: "preview"
                     }
                  }}>Preview as Your Customer</Link> */}
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
         }

      </div>
   )
}
export default withRouter(StatusBanner)