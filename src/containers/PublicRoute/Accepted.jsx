import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../util/Api';

export default class Accepted extends Component {
   mounted = false;
   state = {
      isLoading: true,
      valid: false
   }
   async componentDidMount() {
      this.mounted = true;
      const { entoken } = this.props.match.params;
      if (this.mounted) {
         this.setState({ isLoading: true });
         try {
            const { data } = await axios.post('/quotes/view-public/quote', { entoken });
            this.setState({ isLoading: false });
            if (data.quote.status === "accepted") this.setState({ valid: true });
            else this.setState({ valid: false });
         } catch (err) {
            this.setState({ isLoading: false, valid: false });
         }
      }
   }
   render() {
      if (this.state.isLoading) return null;
      else return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              {
                                 this.state.valid ?
                                    <div className="content">
                                       <h1 className="font-w700">Thank you.</h1>
                                       <p className="font-size-h4">You will receive an email as confirmation of your acceptance – <Link to={`/q/${this.props.match.params.entoken}`}>view accepted quote.</Link></p>
                                    </div> :
                                    <div className="content">
                                       <h1 className="font-w700">Sorry, something went wrong. Perhaps try again later</h1>
                                       <p className="font-size-h4">This quote does not exist.</p>
                                       <Link to="/app">Visit the Dashboard</Link>
                                    </div>
                              }

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* END Main Section */}
            </div>
         </main>
      );
   }
}