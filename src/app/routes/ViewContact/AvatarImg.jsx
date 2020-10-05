import React from 'react'

export const AvatarImg = (props) => {
   return (
      <>
         {
            props.contact.category === "company" &&
            <img className="avatar-64 mr-3"
               src="/assets/media/avatars/company1.png"
               alt="..." />
         }
         {
            props.contact.category === "person" &&
            <img className="avatar-64 mr-3"
               src="/assets/media/avatars/person1.png"
               alt="..." />
         }
      </>
   )
}

export default AvatarImg