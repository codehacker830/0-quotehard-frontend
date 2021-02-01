import React, { Component } from 'react';

export default class ActivityHistoryFull extends Component {
   state = {

   };
   
   render() {
      console.log(" ActivityHisotryFull props --->", this.props);
      return (
         <div>
            <p>
               <span className="glyphicon glyphicon-time" /> All Activity
               <button className="buttonLink" onClick={this.props.onHistoryClose}>Hide</button>
            </p>
            <table className="table">
               <tbody>
                  <tr>
                     <td className="history-date"><span className="dt-time" data-time="[1605893447,1,1]">36 minutes ago</span>
                     </td>
                     <td>Updated and Back Online by Orislaliu <div className="history-email">
                        <p className="history-email-subject">New quote: Quote title...</p>
                        <p>Hi Raffale,<br />
                           <br />
                           Orislaliu of CodnetixCompany-111 has prepared the following quote for you:<br />
                           <br />
                           [View-quote-link-block]
                        </p>
                     </div>
                     </td>
                  </tr>
                  <tr>
                     <td className="history-date"><span className="dt-time" data-time="[1605893431,1,1]">36 minutes ago</span>
                     </td>
                     <td>Edited by Orislaliu</td>
                  </tr>
                  <tr>
                     <td className="history-date"><span className="dt-time" data-time="[1605893386,1,1]">37 minutes ago</span>
                     </td>
                     <td>Taken Offline by Orislaliu, Editing…</td>
                  </tr>
                  <tr>
                     <td className="history-date"><span className="dt-time" data-time="[1605892422,1,1]">53 minutes ago</span>
                     </td>
                     <td>New Quote sent by Orislaliu <div className="history-email">
                        <p className="history-email-subject">New quote: Quote title...</p>
                        <p>Hi Raffale,<br />
                           <br />
                           Orislaliu of CodnetixCompany-111 has prepared the following quote for you:<br />
                           <br />
                           [View-quote-link-block]</p>
                     </div>
                     </td>
                  </tr>
                  <tr>
                     <td className="history-date"><span className="dt-time" data-time="[1605892415,1,1]">53 minutes ago</span>
                     </td>
                     <td>Edited by Orislaliu</td>
                  </tr>
                  <tr>
                     <td className="history-date">
                        <span className="dt-time" data-time="[1605882886,1,1]">November 20, 2020 at 4:34PM</span>
                     </td>
                     <td>Created by Orislaliu</td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   }
}