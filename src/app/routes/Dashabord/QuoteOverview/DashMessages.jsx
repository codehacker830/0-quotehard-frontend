import React from 'react'
import { Link } from 'react-router-dom'

export default function DashMessages() {
   return (
      <div className="dash-messages">
         <div className="dash-messages-row">
            <div className="avatar-48" style={{ marginRight: 10, backgroundImage: 'url(https://asset.quotientapp.com/file-s/1/avatar-v2/128/dbd5efede42790d7b57bc6d3146c5f76)' }} />                    <div className="u-overflow-hidden">
               <p>
                  <strong>Raffale</strong> accepted your invite.
               </p>
               <p>
                  <Link className="btn btn-outline-primary btn-sm" to="/app">Okay, got that</Link>
               </p>
            </div>
            <div className="clear"> </div>
         </div>

         <div className="dash-messages-row">
            <div className="avatar-48"
               style={{ marginRight: 10, backgroundImage: 'url(https://secure.gravatar.com/avatar/458f2adb72c2856d24e4f2c2bd73623d?r=g&s=48&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fperson1.png)' }}>
            </div>
            <div className="u-overflow-hidden">
               <p>
                  <strong>Orsino Lucchesi</strong>&nbsp;
                  <small className="lighter">
                     <span className="dt-time" data-time="[1611426219,1,true]">January 24, 2021 at 2:23AM</span>
                  </small>
                  <br />
                  <small>
                     I am Orsino Is this fair calculation? </small>
               </p>
               <p>
                  <Link className="btn btn-sm btn-primary" to="/app">Answer Question</Link>
               </p>
            </div>
            <div className="clear"> </div>
         </div>
         <div className="dash-messages-row">
            <div className="avatar-48"
               style={{ marginRight: 10, backgroundImage: 'url(https://secure.gravatar.com/avatar/33e43e59bbe29151009d234392c90941?r=g&s=48&d=https%3A%2F%2Fasset.quotientapp.com%2Fimage%2Fcontact%2Fperson1.png)' }}>
            </div>
            <div className="u-overflow-hidden">
               <p>
                  <strong>Raul Balotelli</strong>&nbsp;
                  <small className="lighter">
                     <span className="dt-time" data-time="[1611425892,1,true]">January 26, 2021 at 2:18AM</span>
                  </small>
                  <br />
                  <small>
                     I am Raul I have a question for this. </small>
               </p>
               <p>
                  <Link className="btn btn-sm btn-primary" to="/app">Answer Question</Link>
               </p>
            </div>
            <div className="clear"> </div>
         </div>
         <div className="clear" />
      </div>
   )
}
