import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

class SubHeader extends Component {
   render() {
      const { location } = this.props;
      let hidden = false;
      if (
         location.pathname === "/app/content/template/get"
         || location.pathname === "/app/content/item-price/create-new"
         || location.pathname === "/app/content/item-text/create-new"
         || location.pathname.includes("/app/content/item-price/view")
         || location.pathname.includes("/app/content/item-text/view")
         || location.pathname.includes("/app/content/template/")
      ) hidden = true;
      return (
         <div className={`bg-body-light border-top border-bottom ${hidden ? "d-none" : ""}`}>
            <div className="container px-5 py-3">
               <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                  <ul className="nav-main nav-main-horizontal">
                     <li className="nav-main-item">
                        <NavLink className="nav-main-link" exact to="/app/content/templates">
                           <i className="nav-main-link-icon fa fa-broom" />
                           <span className="nav-main-link-name">Templates</span>
                        </NavLink>
                     </li>
                     <li className="nav-main-item">
                        <NavLink className="nav-main-link" exact to="/app/content/item-price/browse">
                           <i className="nav-main-link-icon fa fa-sitemap" />
                           <span className="nav-main-link-name">Price Items</span>
                        </NavLink>
                     </li>
                     <li className="nav-main-item">
                        <NavLink className="nav-main-link" exact to="/app/content/item-text/browse">
                           <i className="nav-main-link-icon fa fa-envelope-open-text" />
                           <span className="nav-main-link-name">Text Items</span>
                        </NavLink>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(SubHeader);