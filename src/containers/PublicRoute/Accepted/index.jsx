import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from '../../../util/Api';
import ErrorQuoteNotExist from '../ErrorQuoteNotExist.jsx';
import AcceptanceSucceed from './AcceptanceSucceed';

class Accepted extends Component {
   isMount = false;
   state = {
      isLoading: true,
      isInValid: false,
      isAccepted: false
   }
   async componentDidMount() {
      this.isMount = true;
      const { entoken } = this.props.match.params;
      if (this.isMount) {
         this.setState({ isLoading: true });
         try {
            const { data } = await axios.post('/quotes/view-public/quote', { entoken });
            this.setState({
               isLoading: false,
               isInValid: false,
            });
            if (data.quote.status === "accepted") this.setState({ isAccepted: true });
            else this.setState({ isAccepted: false });
         } catch (err) {
            this.setState({
               isLoading: false,
               isInValid: true,
               isAccepted: false
            });
         }
      }
   }
   render() {
      const { entoken } = this.props.match.params;
      if (this.state.isLoading) return <>Loading...</>;
      else if (this.state.isInValid) return <ErrorQuoteNotExist />
      else if (this.state.isAccepted) return <AcceptanceSucceed />;
      else return <Redirect to={`/q/${entoken}`} />
   }
}
export default withRouter(Accepted);