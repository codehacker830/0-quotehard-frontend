import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuoteSettings } from '../../actions/Data';

function UserFrom() {
    const authUser = useSelector(state => state.auth.authUser);
    const teamMembers = useSelector(state => state.teamSetting.teamMembers);
    const settings = useSelector(state => state.mainData.quote.settings);
    const userFrom = settings.userFrom;

    const dispatch = useDispatch();
    return (
        <div className="pb-2">
            <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">FROM</label>
            <select className="custom-select rounded-0"
                value={userFrom ? userFrom : authUser ? authUser._id : null}
                onChange={(ev) => dispatch(updateQuoteSettings({ ...settings, userFrom: ev.target.value }))}>
                {
                    teamMembers.map((mate, index) => {
                        const mateFullName = mate.firstName + " " + mate.lastName;
                        return (<option value={mate._id} key={index}>{mateFullName}</option>);
                    })
                }
            </select>
        </div>
    )
}

export default UserFrom
