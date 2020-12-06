import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuoteSettings } from '../../actions/Data';
import { parseDate, parseTime } from '../../util';

export default function SentDate() {
    const settings = useSelector(state => state.mainData.quote.settings);
    const sentAt = settings.sentAt;

    const [sentDate, setSentDate] = useState(parseDate(sentAt));
    const [sentTime, setSentTime] = useState(parseTime(sentAt));
    const dispatch = useDispatch();

    return (
        <div className="pb-2">
            <label htmlFor="_sent_when_date" className="text-gray fa-xs text-uppercase">Date</label>
            <div className="d-flex">
                <div className="w-75 pr-2">
                    <input type="text"
                        id="_sent_when_date"
                        className="form-control mr-2 rounded-0"
                        value={sentDate}
                        onChange={(ev) => setSentDate(ev.target.value)}
                    />
                    <label htmlFor="_sent_when_date" className="text-info fa-xs">YYYY/MM/DD</label>
                </div>
                <div>
                    <input type="text"
                        id="_sent_when_time"
                        className="form-control rounded-0"
                        value={sentTime}
                        onChange={(ev) => setSentTime(ev.target.value)} />
                    <label htmlFor="_sent_when_time" className="text-info fa-xs">HH:mm</label>
                </div>
            </div>
            <p className="fa-xs text-secondary">
                <span className="label mr-1">TIP</span>
                Leave empty to set automatically (when Sent)
            </p>
        </div>
    )
}
