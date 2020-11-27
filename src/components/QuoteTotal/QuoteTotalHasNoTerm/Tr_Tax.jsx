import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tr_tax extends Component {
   render() {
      const { items, tax, settings } = this.props;

      return (
         <tr>
            <td className="total-desc">Tax {tax.taxRate}%</td>
            <td className="total-price">30.00</td>
         </tr>
      );
   }
}
const mapStateToProps = ({ }) => {

};
export default connect(mapStateToProps)(Tr_tax);