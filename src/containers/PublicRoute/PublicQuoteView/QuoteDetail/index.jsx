import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDateTime } from '../../../../util';
import PreparedForInline from './Inline/PreparedForInline';
import FullCustomerDetailInline from './Inline/FullCustomerDetailInline';
import FullCustomerDetailInColumns from './InColumns/FullCustomerDetailInColumns';
import PreparedForInColumns from './InColumns/PreparedForInColumns';
import CopyToInline from './Inline/CopyToInline';
import { formatDate } from '../../../../util';

class QuoteDetail extends Component {
   render() {
      console.log(" QuoteDetail Props ---------------->", this.props);
      const { auth, appearanceSetting, teamSetting, quote } = this.props;
      const { userFrom } = quote.settings;
      if (appearanceSetting.contactDetailLayout == 0) return (
         <div className="quote-detail quote-detail-columns">
            <div className="quote-detail-columns-col">
               <div className="quote-detail-row">
                  <label className="quote-detail-label">From</label>
                  <div className="quote-detail-block">
                     {userFrom.firstName + " " + userFrom.lastName}<br />

                     {appearanceSetting.companyDisplayName}<br />
                     {
                        appearanceSetting.companyAddress &&
                        <>
                           {appearanceSetting.companyAddress}<br />
                        </>
                     }
                     {
                        appearanceSetting.companyWebsite &&
                        <a target="_blank" href={appearanceSetting.companyWebsite}>{appearanceSetting.companyWebsite}</a>
                     }
                  </div>
                  {
                     appearanceSetting.companyPhone &&
                     <>
                        <label className="quote-detail-label">Phone</label>
                        <div className="quote-detail-block">{appearanceSetting.companyPhone}</div>
                     </>
                  }
               </div>
            </div>
            <div className="quote-detail-columns-col">
               <div className="quote-detail-row">
                  <PreparedForInColumns firstPerson={quote.toPeopleList[0]} />
                  <FullCustomerDetailInColumns firstPerson={quote.toPeopleList[0]} />
               </div>
            </div>
            <div className="quote-detail-columns-col">
               <div className="quote-detail-row">
                  <label className="quote-detail-label">Quote Number</label>
                  <div className="quote-detail-block">{quote.number}</div>
                  <label className="quote-detail-label">Date</label>
                  <div className="quote-detail-block">
                     <span className="dt-time">{formatDate(quote.settings.sentAt)}</span></div>
                  <label className="quote-detail-label">Valid until</label>
                  <div className="quote-detail-block">
                     <span className="dt-time">{formatDateTime(quote.settings.validUntil)}</span></div>
               </div>
            </div>
            <div className="clear" />
         </div>
      );
      else if (appearanceSetting.contactDetailLayout == 1) return (
         <div className="quote-detail quote-detail-inline">
            <PreparedForInline firstPerson={quote.toPeopleList[0]} />
            <FullCustomerDetailInline firstPerson={quote.toPeopleList[0]} />
            <CopyToInline toPeopleList={quote.toPeopleList} />
            <div>
               <label>Prepared&nbsp;by</label>&nbsp;
               <span className="quote-detail-block">
                  {userFrom.firstName + " " + userFrom.lastName}, {appearanceSetting.companyDisplayName}
               </span>
            </div>
            {
               appearanceSetting.companyAddress &&
               <div>
                  <label>Address</label> <span className="quote-detail-block">{appearanceSetting.companyAddress}</span>
               </div>
            }
            <div>
               {
                  appearanceSetting.companyPhone &&
                  <>
                     <label>Phone</label>&nbsp;
                     <span className="quote-detail-block">{appearanceSetting.companyPhone}</span>
                  </>

               }
               {
                  appearanceSetting.companyWebsite &&
                  <>
                     <label>Website</label>&nbsp;
                     <span className="quote-detail-block">
                        <a target="_blank" href={`https://${appearanceSetting.companyWebsite}`}>{appearanceSetting.companyWebsite}</a>
                     </span>
                  </>
               }
            </div>
            <div>
               <label>Quote number</label>&nbsp;
                  <span className="quote-detail-block">{quote.number}</span>
               <label>Date</label>&nbsp;
                  <span className="quote-detail-block">
                  <span className="dt-time">{formatDate(quote.settings.sentAt)}</span>
               </span>
               <label>Valid until</label>&nbsp;
                  <span className="quote-detail-block">
                  <span className="dt-time">{formatDateTime(quote.settings.validUntil)}</span>
               </span>
            </div>
         </div>
      );
      else return (
         <>
            <div className="quote-detail-row">
               <label className="quote-detail-label">From</label>
               <div className="quote-detail-block">
                  {userFrom.firstName + " " + userFrom.lastName}<br />
                  {
                     appearanceSetting.companyDisplayName &&
                     <>
                        {appearanceSetting.companyDisplayName}<br />
                     </>
                  }
                  {
                     appearanceSetting.companyAddress &&
                     <>
                        {appearanceSetting.companyAddress}<br />
                     </>
                  }
                  {
                     appearanceSetting.companyWebsite &&
                     <a target="_blank" href={`https://${appearanceSetting.companyWebsite}`}>{appearanceSetting.companyWebsite}</a>
                  }
               </div>

               {
                  appearanceSetting.companyPhone &&
                  <>
                     <label className="quote-detail-label">Phone</label>
                     <div className="quote-detail-block">{appearanceSetting.companyPhone}</div>
                  </>
               }
            </div>
            <div className="quote-detail-row">
               <PreparedForInColumns firstPerson={quote.toPeopleList[0]} />
               <FullCustomerDetailInColumns firstPerson={quote.toPeopleList[0]} />
            </div>
            <div className="quote-detail-row">
               <label className="quote-detail-label">Quote Number</label>
               <div className="quote-detail-block">{quote.number}</div>
               <label className="quote-detail-label">Date</label>
               <div className="quote-detail-block">
                  <span className="dt-time">{formatDate(quote.settings.sentAt)}</span></div>
               <label className="quote-detail-label">Valid until</label>
               <div className="quote-detail-block">
                  <span className="dt-time">{formatDateTime(quote.settings.validUntil)}</span></div>
            </div>
         </>
      );
   }
}
const mapStateToProps = ({ auth, appearanceSetting, teamSetting, mainData }) => ({ auth, appearanceSetting, teamSetting, quote: mainData.quote });
export default connect(mapStateToProps)(QuoteDetail);