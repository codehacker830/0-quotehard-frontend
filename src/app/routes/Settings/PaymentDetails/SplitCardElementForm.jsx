import React, { useMemo, useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
   useStripe,
   useElements,
   CardNumberElement,
   CardCvcElement,
   CardExpiryElement
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { toast } from "react-toastify";
import axios from "../../../../util/Api";

const useOptions = () => {
   const fontSize = useResponsiveFontSize();
   const options = useMemo(
      () => ({
         style: {
            base: {
               fontSize,
               color: "#424770",
               letterSpacing: "0.025em",
               fontFamily: "Source Code Pro, monospace",
               "::placeholder": {
                  color: "#aab7c4"
               }
            },
            invalid: {
               color: "#ff004b",
               iconColor: "#fa755a",
            }
         }
      }),
      [fontSize]
   );

   return options;
};

const SplitCardElementForm = () => {
   const history = useHistory();
   const { state } = useLocation();
   const stripe = useStripe();
   const elements = useElements();
   const options = useOptions();
   const [isLoading, setLoading] = useState(false);
   const [name, setName] = useState("");

   const handleSubmit = async event => {
      event.preventDefault();
      if (!stripe || !elements) {
         // Stripe.js has not loaded yet. Make sure to disable
         // form submission until Stripe.js has loaded.
         return;
      }
      if (!name) { toast.success("Please fill in Name on Card field."); return; }
      setLoading(true);
      try {
         const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
         });
         console.log("[PaymentMethod] ------->", payload);
         if (payload.paymentMethod) {
            let subscription;
            try {
               subscription = await axios.post('/settings/payment/subscribe', { paymentMethodId: payload.paymentMethod.id, name });
               console.log("subscription _________", subscription);
               toast.success("Payment details saved - thank you for your continued support.");
               history.push('/app/settings/billing-overview');
            } catch (err) {
               let Errors = err.response.data.errors;
               console.error(" CREATE SUBSCRIPTION API ERROR RESPONSE !!! ", err.response.data)
               if (Errors) toast.success(Errors.message);
            }
         } else {
            toast.success(payload.error.message);
         }
         setLoading(false);
      } catch (err) {
         console.error("createPaymentMethod failed !! =>", err)
         // toast.success(err.message);
         setLoading(false);
      }

   };

   return (
      <form onSubmit={handleSubmit}>
         <label>
            Card number
            <span className="float-right font-size-sm text-success"><i className="fa fa-lock mr-1" />SECURE</span>
            <CardNumberElement
               options={options}
               onReady={() => {
                  console.log("CardNumberElement [ready]");
               }}
               onChange={event => {
                  console.log("CardNumberElement [change]", event);
               }}
               onBlur={() => {
                  console.log("CardNumberElement [blur]");
               }}
               onFocus={() => {
                  console.log("CardNumberElement [focus]");
               }}
            />
         </label>
         <label>
            Expiration date
            <CardExpiryElement
               options={options}
               onReady={() => {
                  console.log("CardNumberElement [ready]");
               }}
               onChange={event => {
                  console.log("CardNumberElement [change]", event);
               }}
               onBlur={() => {
                  console.log("CardNumberElement [blur]");
               }}
               onFocus={() => {
                  console.log("CardNumberElement [focus]");
               }}
            />
         </label>
         <label>
            Name on Card
            <input className="StripeElement StripeElement--empty" style={options.style.base} onChange={ev => setName(ev.target.value)} value={name} />
         </label>
         <label>
            CVC - [3 or 4 digit code, usually found on the back of your card.]
            <CardCvcElement
               options={options}
               onReady={() => {
                  console.log("CardNumberElement [ready]");
               }}
               onChange={event => {
                  console.log("CardNumberElement [change]", event);
               }}
               onBlur={() => {
                  console.log("CardNumberElement [blur]");
               }}
               onFocus={() => {
                  console.log("CardNumberElement [focus]");
               }}
            />
         </label>
         <div className="my-4">
            <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" type="submit" disabled={!stripe || isLoading}>
               {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
               Save
            </button>
            <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`${state && state.from ? state.from : "/app"}`} disabled={isLoading}>Cancel</Link>
         </div>
      </form>
   );
};

export default SplitCardElementForm;
