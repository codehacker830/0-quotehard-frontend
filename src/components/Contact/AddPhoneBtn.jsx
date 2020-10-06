import React, { Component } from 'react';

export default class AddPhoneBtn extends Component {
   render() {
      return (
         <div className="form-group">
            <button
               type="button"
               className="btn btn-outline-dark"
               onClick={this.props.handleClick}
            >
               <i className="fa fa-plus"></i> Add Phone</button>
         </div>
      );
   }
}