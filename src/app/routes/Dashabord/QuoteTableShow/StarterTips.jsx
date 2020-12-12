import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class StarterTips extends Component {
    render() {
        return (
            <div className="starterTips">
                <h3 className="starterTips-title">Getting started checklist</h3>
                <ul>
                    <li className=" starterTips-done">
                        <i className="fa fa-fw fa-check" /> Quotient account created </li>
                    <li className=" starterTips-done">
                        <i className="fa fa-fw fa-check" /> Company logo. Nice! </li>
                    <li className="">
                        <i className="far fa-fw fa-square" /> First quote sent </li>
                    <li className="">
                        <i className="far fa-fw fa-square" /> First quote accepted </li>
                    <li className="">
                        <Link to="/app/settings"><i className="far fa-fw fa-square" /> Enable an Add-on or App…</Link>
                    </li>
                    <li className="">
                        <Link to="/app/settings/team"><i className="far fa-fw fa-square" /> Invite a Team Member…</Link>
                    </li>
                </ul>
                <p>
                    <button className="btn btn-default btn-sm">Hide Checklist</button>
                </p>
            </div>
        )
    }
}
