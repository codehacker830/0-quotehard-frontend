import React from 'react'
import CompanyNameShow from './CompanyNameShow';

export const QuotetoPeopleList = (props) => {

   return (
      <>
         {
            props.toPeopleList.map((contact, index) => {
               return (
                  <div className="alert alert-info w-100 border border-primary" key={index}>
                     <button type="button" className="btn close" onClick={() => props.removeContact(index)}>
                        <span>×</span>
                     </button>
                     <strong className="text-black my-1 mr-1">{contact.firstName} {contact.lastName}</strong>
                     <CompanyNameShow companyId={contact.company} />
                     <p className="mb-0">{contact.email}</p>
                  </div>
               );
            })
         }
      </>

   )
}

export default QuotetoPeopleList;