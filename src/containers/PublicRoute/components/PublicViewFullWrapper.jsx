import React, { Component } from 'react';
import { connect } from 'react-redux';

class PublicViewFullWrapper extends Component {
   render() {
      const { appearanceSetting } = this.props;
      if (appearanceSetting.contactDetailLayout != 2) return (this.props.children);
      else return (
         <div className="row">
            {this.props.children}
         </div>
      );
   }
}
const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting: appearanceSetting });
export default connect(mapStateToProps)(PublicViewFullWrapper);