import React, { Component } from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';

export default function asyncComponent(importComponent) {
   class AsyncFunc extends Component {
      constructor(props) {
         super(props);
         this.state = {
            component: null
         };
      }

      componentWillMount() {
         Nprogress.start();
      }

      componentWillUnmount() {
         this.mounted = false;
      }

      async componentDidMount() {
         this.mounted = true;
         const { default: Component } = await importComponent();
         Nprogress.done();
         if (this.mounted) {
            this.setState({
               component: <Component {...this.props} />
            });
         }
      }

      render() {
         const Component = this.state.component ||
            <div className="d-flex"
               style={{ height: 'calc(100vh - 200px)' }}>
               <div className="m-auto">
                  <div className="loader"></div>
                  {/* <div className="spinner-grow text-secondary mr-2" role="status">
                     <span className="sr-only">Loading...</span>
                  </div>
                  <div className="spinner-grow text-secondary mr-2" role="status">
                     <span className="sr-only">Loading...</span>
                  </div>
                  <div className="spinner-grow text-secondary" role="status">
                     <span className="sr-only">Loading...</span>
                  </div> */}
               </div>
            </div>;
         return (
            <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
               {Component}
            </ReactPlaceholder>
         );
      }
   }

   return AsyncFunc;
}
