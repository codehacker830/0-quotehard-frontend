import React, { Component } from 'react';
import { numberOfOption } from "../../../util";

export default class Tr_OptionSelected extends Component {
   render() {
      const { items } = this.props;
      if (!numberOfOption(items).total) return null;
      else return (
         <tr className="options">
            <td className="total-desc">
               <p className="quote-text-sm"><span>Options selected</span></p>
            </td>
            <td className="total-price">
               <p className="quote-text-sm">{numberOfOption(items).selected} of {numberOfOption(items).total}</p>
            </td>
         </tr>
      );
   }
}