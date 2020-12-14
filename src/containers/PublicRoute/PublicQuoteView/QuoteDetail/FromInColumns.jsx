import React, { Component } from 'react'
import { connect } from 'react-redux'

class FromInColumns extends Component {
   render() {
      console.log("!@#$!@#!", this.props)
      const { appearanceSetting, quote } = this.props;
      const { userFrom } = quote.settings;
      return (
         <div className="quote-detail-row">
            <label className="quote-detail-label">From</label>
            <div className="quote-detail-block">
               {userFrom.firstName + " " + userFrom.lastName}<br />
               {
                  appearanceSetting.companyDisplayName &&
                  <React.Fragment>
                     {appearanceSetting.companyDisplayName}<br />
                  </React.Fragment>
               }
               {
                  appearanceSetting.address &&
                  <React.Fragment>
                     {appearanceSetting.address}<br />
                  </React.Fragment>
               }
               {
                  appearanceSetting.website &&
                  <a target="_blank" className="text-primary" href={`https://${appearanceSetting.website}`}>{appearanceSetting.website}</a>
               }
            </div>
            {
               appearanceSetting.phone &&
               <React.Fragment>
                  <label className="quote-detail-label">Phone</label>
                  <div className="quote-detail-block">{appearanceSetting.phone}</div>
               </React.Fragment>
            }
         </div>
      )
   }
}

const mapStateToProps = ({ appearanceSetting, mainData }) => {
   const { quote } = mainData;
   return { appearanceSetting, quote };
};
export default connect(mapStateToProps)(FromInColumns);
