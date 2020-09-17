import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import TextItemForm from '../../../components/TextItemForm';
import ToolWrapper from '../../../components/ToolWrapper';

export default class GetTemplate extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         isEditableQuantity: false,
         isDiscount: false,
         isSubscription: false,
         isCostPriceMargin: false,
      }
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo="/app/content/templates">
               Templates
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {/* Template Setting */}
                  <div className="row">
                     <div className="col-sm-6">

                     </div>
                     <div className="col-sm-6">
                        <div className="pl-4 py-2" style={{ borderLeft: "4px solid #eee" }}>
                           <h3>Template Settings</h3>
                           <button type="button" className="btn btn-outline-dark">Show All...</button>
                        </div>
                     </div>
                  </div>

                  {/* Template Title */}
                  <div className="row">
                     <div className="col-12">
                        <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4" rows={1} placeholder="Title of Template">
                        </textarea>
                     </div>
                  </div>

                  {/* Controller button group */}
                  <PriceItemForm
                     isPaperClipDisabled={false}
                     isSettingDisabled={false}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}

                  // onHandleChange={()}

                  />

                  <div className="row py-4">
                     <div className="col-12">
                        <button type="button" className="btn btn-alt-light">
                           <i className="fa fa-plus mr-1"></i>
                           Add Item
                        </button>
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-md-4 col-sm-6 col-12 ml-auto">
                        <table className="table table-borderless table-vcenter">
                           <tr>
                              <td className="text-black text-right font-w500">Subtotal</td>
                              <td className="bg-light-gray border border-primary">0.00</td>
                           </tr>
                           <tr>
                              <td className="text-black text-right font-w500">Tax 10%</td>
                              <td className="bg-light-gray border border-primary">0.00</td>
                           </tr>
                           <tr>
                              <td className="text-black text-right font-w700">Total including tax</td>
                              <td className="bg-light-gray border border-primary text-black font-w700">
                                 $0.00
                                       <span className="text-secondary font-w400 fa-fw ml-2">per month</span>
                              </td>
                           </tr>
                        </table>
                     </div>
                  </div>

                  <TextItemForm
                     isPaperClipDisabled={false}
                     isSettingDisabled={true}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                  />

                  <div className="row py-4">
                     <div className="col-12">
                        <button type="button" className="btn btn-alt-light mb-2">
                           <i className="fa fa-plus mr-1"></i>
                           Add Item
                        </button>
                     </div>
                  </div>

                  {/* Footer action button group */}
                  <div className="row p-3">
                     <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Create</button>
                     <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}