import React, { Component } from 'react';
import NavCrump from '../../components/NavCrump';
import PriceItemForm from '../../components/PriceItemForm';
import QuoteContact from '../../components/QuoteContact';
import QuoteSettings from '../../components/QuoteSettings';
import TextItemForm from '../../components/TextItemForm';

export default class GetQuote extends Component {
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
      console.log(" this props => ", this.props)
      const { location } = this.props;
      const { state } = location;
      let HeadLinkText = 'Dashboard';
      if (state && state.from === "/app/quotes") HeadLinkText = 'Quotes';
      return (
         <React.Fragment>
            <NavCrump linkTo={`${state && state.from ? state.from : "/app"}`}>
               {HeadLinkText}
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <div className="row">
                     {/* Email list */}
                     <div className="col-sm-6">
                        <div className="d-flex">
                           <div className="p-1 font-w700">
                              To
                           </div>
                           <div className="p-1 w-100">
                              <div className="row no-gutters">
                                 <QuoteContact
                                    name={`Jack Wang`}
                                    companyName={`HK`}
                                    email={`test@email.com`}
                                 />
                              </div>
                              <div className="row no-gutters">
                                 <input type="text" id="emailTo" className="form-control rounded-0 maxWidth-550" />
                                 <label for="emailTo" class="text-gray fa-xs">Start with a name or email</label>
                                 {/* <label for="emailTo" class="text-gray fa-xs">Add another… start with a name or email</label> */}
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Quote Setting */}
                     <div className="col-sm-6">
                        <div className="pl-4 py-2" style={{ borderLeft: "4px solid #eee" }}>
                           <QuoteSettings />
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