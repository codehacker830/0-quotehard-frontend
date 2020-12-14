import React, { Component } from 'react'
import { connect } from 'react-redux'

class FromInline extends Component {
   render() {
      const { appearanceSetting, quote } = this.props;
      const { userFrom } = quote.settings;
      return (
         <React.Fragment>
            <div>
               <label>Prepared by</label>&nbsp;
               <span className="quote-detail-block">
                  {userFrom.firstName + " " + userFrom.lastName}, {appearanceSetting.companyDisplayName}
               </span>
            </div>
            {
               appearanceSetting.address &&
               <div>
                  <label>Address</label>&nbsp;
                  <span className="quote-detail-block">{appearanceSetting.address}</span>
               </div>
            }
            <div>
               {
                  appearanceSetting.phone &&
                  <React.Fragment>
                     <label>Phone</label>&nbsp;
                     <span className="quote-detail-block">{appearanceSetting.phone}</span>
                  </React.Fragment>

               }
               {
                  appearanceSetting.website &&
                  <React.Fragment>
                     <label>Website</label>&nbsp;
                     <span className="quote-detail-block">
                        <a target="_blank" className="text-primary" href={`https://${appearanceSetting.website}`}>{appearanceSetting.website}</a>
                     </span>
                  </React.Fragment>
               }
            </div>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ({ appearanceSetting, mainData }) => ({ appearanceSetting, quote: mainData.quote });

export default connect(mapStateToProps)(FromInline)
