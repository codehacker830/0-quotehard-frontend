import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForCustomerDetailInline from './ForCustomerDetailInline';
import ForCustomerDetailInColumns from './ForCustomerDetailInColumns';
import InfoInColumns from './InfoInColumns';
import FromInColumns from './FromInColumns';
import InfoInline from './InfoInline';
import FromInline from './FromInline';

class QuoteDetail extends Component {
   render() {
      console.log(" QuoteDetail Props ----------------> ", this.props);
      const { appearanceSetting } = this.props;
      const { contactDetailLayout, layout } = appearanceSetting;
      if (contactDetailLayout === 0) return (
         <div className="quote-detail quote-detail-columns" style={{ display: "flex" }}>
            <div className="quote-detail-columns-col" style={{ order: layout }}>
               <FromInColumns />
            </div>
            <div className="quote-detail-columns-col" style={{ order: (layout + 1) % 3 }}>
               <ForCustomerDetailInColumns />
            </div>
            <div className="quote-detail-columns-col" style={{ order: (layout + 2) % 3 }}>
               <InfoInColumns />
            </div>
            <div className="clear" />
         </div>
      );
      else if (contactDetailLayout === 1) return (
         <div className="quote-detail quote-detail-inline">
            <ForCustomerDetailInline />
            <FromInline />
            <InfoInline />
         </div>
      );
      else return (
         <React.Fragment>
            <FromInColumns />
            <ForCustomerDetailInColumns />
            <InfoInColumns />
         </React.Fragment>
      );
   }
}
const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting });
export default connect(mapStateToProps)(QuoteDetail);