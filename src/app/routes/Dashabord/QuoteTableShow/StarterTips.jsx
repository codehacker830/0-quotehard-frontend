import clsx from 'clsx'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function StarterTips() {
    const isAddLogoDone = false;
    const isFirstQuoteSent = false;
    const isFirstQuoteAccepted = false;
    const isAddOnEnabled = false;
    const isTeamMemberInvited = false;
    const onHandleClick = () => {

    }
    return (
        <div className="starterTips">
            <h4 className="starterTips-title">Getting started checklist</h4>
            <ul>
                <li className=" starterTips-done">
                    <i className="fa fa-fw fa-check" /> Quotehard account created </li>
                {
                    isAddLogoDone ?
                        <li className=" starterTips-done">
                            <i className="fa fa-fw fa-check" /> Company logo. Nice!</li>
                        : <li className="">
                            <Link to="/app/settings/quote/appearance"><i className="far fa-fw fa-square" /> Add logo</Link></li>
                }
                {
                    isFirstQuoteSent ?
                        <li className=" starterTips-done">
                            <i className="fa fa-fw fa-check" /> Quote sent </li>
                        : <li className="">
                            <i className="far fa-fw fa-square" /> First quote sent </li>
                }
                {
                    isFirstQuoteAccepted ?
                        <li className=" starterTips-done">
                            <i className="fa fa-fw fa-check" /> Quote accepted </li>
                        : <li className="">
                            <i className="far fa-fw fa-square" /> First quote accepted </li>
                }
                {
                    isAddOnEnabled ?
                        <li className=" starterTips-done">
                            <i className="fa fa-fw fa-check" /> Add-on enabled! </li>
                        : <li className="">
                            <Link to="/app/settings"><i className="far fa-fw fa-square" /> Enable an Add-on or App…</Link></li>
                }
                {
                    isTeamMemberInvited ?
                        <li className=" starterTips-done">
                            <i className="fa fa-fw fa-check" /> Team Member invited! </li>
                        : <li className="">
                            <Link to="/app/settings/team"><i className="far fa-fw fa-square" /> Invite a Team Member…</Link></li>
                }
            </ul>
            <p>
                <button className="btn btn-default btn-sm" onClick={onHandleClick}>Hide Checklist</button>
            </p>
        </div >
    )
}

