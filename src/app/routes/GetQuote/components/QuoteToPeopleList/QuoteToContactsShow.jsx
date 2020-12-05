import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuoteToPeopleList } from '../../../../../actions/Data';
import CompanyNameShow from './CompanyNameShow';

export const QuoteToContactsShow = () => {
   const toPeopleList = useSelector(state => {
      const { toPeopleList } = state.mainData.quote;
      return toPeopleList;
   })
   const dispatch = useDispatch();

   const removeContact = (ind) => {
      const newCL = toPeopleList.filter((it, index) => index !== ind);
      dispatch(updateQuoteToPeopleList(newCL));
   }
   return (
      <React.Fragment>
         {
            toPeopleList.map((contact, index) => {
               return (
                  <div className="alert alert-info w-100 border border-primary" key={index}>
                     <button type="button" className="btn close" onClick={() => removeContact(index)}>
                        <span>×</span>
                     </button>
                     <strong className="text-black my-1 mr-1">{contact.firstName} {contact.lastName}</strong>
                     <CompanyNameShow companyId={contact.company} />
                     <p className="mb-0">{contact.email}</p>
                  </div>
               );
            })
         }
      </React.Fragment>

   )
}

export default QuoteToContactsShow;