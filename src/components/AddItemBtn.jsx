import React, { Component } from 'react';

export default class AddItemBtn extends Component {
   render() {
      return (
         <div className="row py-4">
            <div className="col-12">
               <button type="button" className="btn btn-alt-light" onClick={() => this.props.onClickAdd()}>
                  <i className="fa fa-plus mr-1"></i>
                  Add Item
               </button>
            </div>
         </div>
      );
   }
}