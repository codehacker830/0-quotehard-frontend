import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { acceptOnBehalfQuote } from '../../../../actions/Data';
import { checkIfTeamMember, formatDateTime } from '../../../../util';
import axios from '../../../../util/Api';
import AcceptSummary from './AcceptSummary';
import AdditionalComments from './AdditionalComments';
import OrderReferenceNumber from './OrderReferenceNumber';
import AcceptedOrderReferenceNumber from './AcceptedOrderReferenceNumber';
import AcceptedAdditionalComments from './AcceptedAdditionalComments';
import clsx from 'clsx';
import _ from 'lodash';
import AcceptOnBehalfBox from './AcceptOnBehalfBox';
import AcceptanceBox from './AcceptanceBox';
import AcceptedBox from './AcceptedBox';

class AcceptBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isAgree: false,
            onBehalfOfPersonId: null,
            isAcceptanceEmailNotification: false
        };

    }

    render() {
        const { person, quote, teamMembers, colors } = this.props;
        const customerFullName = person ? person.firstName + " " + person.lastName : "";
        const isMember = checkIfTeamMember(quote.author, teamMembers);
        const isPreviewMode = (this.props.match.path === "/q/:entoken/preview");
        if (this.props.isAcceptOnBehalfBoxShow) return <AcceptOnBehalfBox />;
        else if (isPreviewMode) return <AcceptanceBox />
        else if (!isMember && quote.status === "sent") return <AcceptanceBox />
        else if (quote.status === "accepted") return <AcceptedBox />
        else return null;
    }
}

const mapStateToProps = ({ auth, mainData, teamSetting, appearanceSetting }) => {
    const { colors } = appearanceSetting;
    const { teamMembers } = teamSetting;
    const { authUser, person } = auth;
    const { quote } = mainData;
    return { colors, authUser, person, quote, teamMembers };
}

const mapDispatchToProps = {
    acceptOnBehalfQuote
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcceptBox));
