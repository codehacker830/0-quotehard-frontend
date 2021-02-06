import React, { Component } from 'react';

export default class AddAddressBtn extends Component {
   render() {
      return (
         <div className="form-group">
            <button
               type="button"
               className="btn btn-light"
               onClick={this.props.handleClick}>
               <i className="fa fa-plus"></i> Add Address</button>
         </div>
      );
   }
}