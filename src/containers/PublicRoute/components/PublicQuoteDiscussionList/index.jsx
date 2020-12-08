import React, { Component } from 'react'
import { connect } from 'react-redux';
import Comment from './Comment';
import PrivateNote from './PrivateNote';
import QuestionAndAnswer from './QuestionAndAnswer';

class PublicQuoteDiscussionList extends Component {
    render() {
        return this.props.discussions.map((discussion, index) => {
            if (discussion.category === "privateNote") return <PrivateNote key={index} discussion={discussion} />
            else if (discussion.category === "comment") return <Comment key={index} discussion={discussion} />
            else if (discussion.category === "questionAndAnswer") return <QuestionAndAnswer key={index} discussion={discussion} />
        })

    }
}
const mapStateToProps = ({ mainData }) => {
    const { discussions } = mainData.quote;
    return { discussions };
}

export default connect(mapStateToProps)(PublicQuoteDiscussionList);
