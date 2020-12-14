import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCustomerDetailInline from './FullCustomerDetailInline';
import FullCustomerDetailInColumns from './FullCustomerDetailInColumns';
import InfoInColumns from './InfoInColumns';
import FromInColumns from './FromInColumns';
import InfoInline from './InfoInline';
import FromInline from './FromInline';

class QuoteDetail extends Component {
   render() {
      console.log(" QuoteDetail Props ----------------> ", this.props);
      const { appearanceSetting } = this.props;
      if (appearanceSetting.contactDetailLayout === 0) return (
         <div className="quote-detail quote-detail-columns">
            <div className="quote-detail-columns-col">
               <FromInColumns />
            </div>
            <div className="quote-detail-columns-col">
               <FullCustomerDetailInColumns />
            </div>
            <div className="quote-detail-columns-col">
               <InfoInColumns />
            </div>
            <div className="clear" />
         </div>
      );
      else if (appearanceSetting.contactDetailLayout === 1) return (
         <div className="quote-detail quote-detail-inline">
            <FullCustomerDetailInline />
            <FromInline />
            <InfoInline />
         </div>
      );
      else return (
         <React.Fragment>
            <FromInColumns />
            <FullCustomerDetailInColumns />
            <InfoInColumns />
         </React.Fragment>
      );
   }
}
const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting });
export default connect(mapStateToProps)(QuoteDetail);