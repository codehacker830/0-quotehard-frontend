import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeamMembers } from '../../../actions/Team';
import { checkIfTeamMember } from '../../../util';
import FullCustomerDetailInColumn from '../components/FullCustomerDetailInColumn';
import PersonContactLinkShow from './PersonContactLinkShow';
import CompanyContactLinkShow from './CompanyContactLinkShow';
import PreparedFor from './PreparedFor';
import FullCustomerDetail from './FullCustomerDetail';
import CopyTo from './CopyTo';

class QuoteDetail extends Component {
   componentDidMount() {
      if (this.props.auth.authUser) {
         this.props.getTeamMembers();
      }
   }
   render() {
      console.log(" QuoteDetail Props ---------------->", this.props);
      const { auth, appearanceSetting, teamSetting, quote } = this.props;
      const isTeamMember = checkIfTeamMember(auth.authUser, teamSetting.teamMembers);
      if (appearanceSetting.contactDetailLayout == 0) return (
         <div className="quote-detail quote-detail-columns">
            <div className="quote-detail-columns-col">
               <div className="quote-detail-row">
                  <label className="quote-detail-label">From</label>
                  <div className="quote-detail-block">
                     Silver Mind<br />

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
                        <div className="quote-detail-block">123123123</div>
                     </>
                  }
               </div>
            </div>
            <div className="quote-detail-columns-col">
               <div className="quote-detail-row">
                  <label className="quote-detail-label">For</label>
                  <div className="quote-detail-block">
                     <a className="u-understated" href="/app/c/contacts/view/4389574">MoneyOwnerCompany</a>
                  </div>
                  <label className="quote-detail-label">To</label>
                  <div className="quote-detail-block">
                     <a className="u-understated" href="/app/c/contacts/view/4389575">Money Owner</a>
                  </div>
                  <FullCustomerDetailInColumn />
               </div>
            </div>
            <div className="quote-detail-columns-col">
               <div className="quote-detail-row">
                  <label className="quote-detail-label">Quote Number</label>
                  <div className="quote-detail-block">3</div>
                  <label className="quote-detail-label">Date</label>
                  <div className="quote-detail-block">
                     <span className="dt-time" data-time="[1605892380,0,0]">November 20, 2020</span></div>
                  <label className="quote-detail-label">Valid until</label>
                  <div className="quote-detail-block">
                     <span className="dt-time" data-time="[1618839240,1,0]">April 19, 2021 at 3:34PM</span></div>
               </div>
            </div>
            <div className="clear" />
         </div>
      );
      else if (appearanceSetting.contactDetailLayout == 1) return (
         <div className="quote-detail quote-detail-inline">
            <PreparedFor firstPerson={quote.toPeopleList[0]} />
            <FullCustomerDetail firstPerson={quote.toPeopleList[0]} />
            <CopyTo toPeopleList={quote.toPeopleList} />
            <div>
               <label>Prepared&nbsp;by</label>&nbsp;
               <span className="quote-detail-block">
                  Silver Mind
                  {
                     appearanceSetting.companyDisplayName ?
                        <>{`, ${appearanceSetting.companyDisplayName}`}</>
                        : null
                  }

               </span>
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
         </div>
      );
      else return (
         <>
            <div className="quote-detail-row">
               <label className="quote-detail-label">From</label>
               <div className="quote-detail-block">
                  Silver Mind<br />
                  SilverCompany<br />
                  addresssss<br /><a target="_blank" href="http://www.exmaple.com">www.exmaple.com</a> </div>
               <label className="quote-detail-label">Phone</label>
               <div className="quote-detail-block">
                  123123123 </div>
            </div>
            <div className="quote-detail-row">
               <label className="quote-detail-label">
                  For
               </label>
               <div className="quote-detail-block">
                  MoneyOwnerCompany </div>
               <label className="quote-detail-label">To</label>
               <div className="quote-detail-block">Money Owner</div>

               <FullCustomerDetailInColumn />

            </div>
            <div className="quote-detail-row">
               <label className="quote-detail-label">Quote Number</label>
               <div className="quote-detail-block">4</div>
               <label className="quote-detail-label">
                  Date
               </label>
               <div className="quote-detail-block">
                  <span className="dt-time" data-time="[1605903540,0,0]">November 20, 2020</span></div>
               <label className="quote-detail-label">Valid until</label>
               <div className="quote-detail-block">
                  <span className="dt-time" data-time="[1618859820,1,0]">April 19, 2021 at 9:17PM</span></div>
            </div>
         </>
      );
   }
}
const mapStateToProps = ({ auth, appearanceSetting, teamSetting }) => ({ auth, appearanceSetting, teamSetting });
const mapDispatchToProps = { getTeamMembers };
export default connect(mapStateToProps, mapDispatchToProps)(QuoteDetail);