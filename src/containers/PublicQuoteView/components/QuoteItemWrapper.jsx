import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuoteItemWrapper extends Component {
   render() {
      const { appearanceSetting } = this.props;
      if (appearanceSetting.contactDetailLayout != 2) return (this.props.children);
      else return (
         <div className="col-sm-9" style={{ order: -1 }}>
            {this.props.children}
         </div>
      );
   }
}
const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting: appearanceSetting });
export default connect(mapStateToProps)(QuoteItemWrapper);