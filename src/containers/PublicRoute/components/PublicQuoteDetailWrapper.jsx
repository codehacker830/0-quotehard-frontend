import React, { Component } from 'react';
import { connect } from 'react-redux';

class PublicQuoteDetailWrapper extends Component {
   render() {
      const { appearanceSetting } = this.props;
      if (appearanceSetting.contactDetailLayout != 2) return (this.props.children);
      else return (
         <div className="col-sm-3 quote-detail quote-detail-2col" style={{ order: 0 }}>
            <div className="quote-detail-sm-pad">
               {this.props.children}
            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting: appearanceSetting });
export default connect(mapStateToProps)(PublicQuoteDetailWrapper)