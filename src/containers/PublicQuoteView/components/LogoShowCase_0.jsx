import React, { Component } from 'react';
import { connect } from 'react-redux';

class LogoShowCase extends Component {
   render() {
      if (this.props.appearanceSetting.logo)
         return (
            <div className="row no-gutters mb-4">
               <img title="company-logo" alt="logo" src={this.props.appearanceSetting.logo} />
            </div>
         );
      else return null;
   }
}
const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting });
export default connect(mapStateToProps)(LogoShowCase);