import React, { Component } from 'react';

export default class SubTotal extends Component {
   render() {
      return (
         <div className="row">
            <div className="d-flex ml-auto">
               <div className="py-3">
                  <button className="btn btn-light mb-auto" onClick={() => this.props.removeItem(this.props.index)}>
                     <i className="fa fa-trash-alt"></i>
                  </button>
               </div>
               <div className="p-3 text-right my-auto">
                  <p className="text-secondary mb-0">Option selected</p>
                  <p className="text-black mb-0">Subtotal</p>
               </div>
               <div className="border p-3 text-right my-auto" style={{ width: 240, height: "100%" }}>
                  <p className="text-secondary mb-0">0 of 2</p>
                  <p className="text-black mb-0">200</p>
               </div>
            </div>
         </div>
      );
   }
}