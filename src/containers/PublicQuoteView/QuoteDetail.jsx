import React, { Component } from 'react';

export default class QuoteDetail extends Component {
   render() {
      return (
         <React.Fragment>
            <div className="quote-detail quote-detail-columns">
               <div className="quote-detail-columns-col">
                  <div className="quote-detail-row">
                     <label className="quote-detail-label">From</label>
                     <div className="quote-detail-block">
                        Silver Mind<br />
                        SilverMindCompany-111<br />
                        adddddressss<br />
                        <a target="_blank" href="http://www.exmaple.com">www.exmaple.com</a>
                     </div>
                     <label className="quote-detail-label">Phone</label>
                     <div className="quote-detail-block">123123123</div>
                  </div>
               </div>
               <div className="quote-detail-columns-col">
                  <div className="quote-detail-row">
                     <label className="quote-detail-label">
                        For
                                 </label>
                     <div className="quote-detail-block">
                        <a className="u-understated" href="/39310/c/contacts/view/4389574">MoneyOwnerCompany</a> </div>
                     <label className="quote-detail-label">To</label>
                     <div className="quote-detail-block">
                        <a className="u-understated" href="/39310/c/contacts/view/4389575">Money Owner</a> </div>
                  </div>
               </div>
               <div className="quote-detail-columns-col">
                  <div className="quote-detail-row">
                     <label className="quote-detail-label">Quote Number</label>
                     <div className="quote-detail-block">3</div>
                     <label className="quote-detail-label">
                        Date
                                 </label>
                     <div className="quote-detail-block">
                        <span className="dt-time" data-time="[1605892380,0,0]">November 20, 2020</span></div>
                     <label className="quote-detail-label">Valid until</label>
                     <div className="quote-detail-block">
                        <span className="dt-time" data-time="[1618839240,1,0]">April 19, 2021 at 3:34PM</span></div>
                  </div>
               </div>
               <div className="clear" />
            </div>

            {/* <div className="quote-detail quote-detail-inline">
               <div>
                  <label>Prepared&nbsp;for</label>&nbsp;
                  <span className="quote-detail-block"><a className="u-understated"
                     href="/39310/c/contacts/view/4389574">MoneyOwnerCompany</a>, <a className="u-understated"
                        href="/39310/c/contacts/view/4389575">Money Owner</a></span>
               </div>
               <div>
                  <label>Prepared&nbsp;by</label>&nbsp;
                  <span className="quote-detail-block">Silver Mind, SilverMindCompany-111</span>
               </div>
               <div>
                  <label>Address</label> <span className="quote-detail-block">adddddressss</span>
               </div>
               <div>
                  <label>Phone</label>&nbsp;
                  <span className="quote-detail-block">123123123</span>
                  <label>Website</label>&nbsp;
                  <span className="quote-detail-block">
                     <a target="_blank" href="http://www.exmaple.com">www.exmaple.com</a>
                  </span>
               </div>
               <div>
                  <label>Quote&nbsp;number</label>&nbsp;
                  <span className="quote-detail-block">5</span>
                  <label>Date</label>&nbsp;
                  <span className="quote-detail-block">
                     <span className="dt-time" data-time="[1605930508,0,0]">November 21, 2020</span>
                  </span>
                  <label>Valid&nbsp;until</label>&nbsp;
                  <span className="quote-detail-block">
                     <span className="dt-time" data-time="[1618884000,1,0]">April 20, 2021 at 4:00AM</span>
                  </span>
               </div>
            </div> */}
         </React.Fragment>
      );
   }
}