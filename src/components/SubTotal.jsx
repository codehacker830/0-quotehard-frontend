import React, { Component } from 'react';

export default class SubTotal extends Component {
   render() {
      return (
         <div className="row">
            <div className="d-flex ml-auto">
               <button className="btn btn-" onClick={() => this.props.removeItem(this.props.index)}>
                  <i className="fa fa-trash-alt"></i>
               </button>
               <span className="m-auto p-2">Subtotal</span>
               <div className="border p-3" style={{ width: 240, height: 60 }}>
                  200
            </div>
            </div>
         </div>
      );
   }
}