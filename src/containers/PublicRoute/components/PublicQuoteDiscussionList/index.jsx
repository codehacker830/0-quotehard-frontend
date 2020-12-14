import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comment from './Comment';
import PrivateNote from './PrivateNote';
import QuestionAndAnswer from './QuestionAndAnswer';

class PublicQuoteDiscussionList extends Component {
    render() {
        const { discussions } = this.props;
        const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
        const isAbleToShowHeading = discussions.find(discussion => discussion.category !== "privateNote");
        if (discussions.length) return (
            <React.Fragment>
                {
                    !!isAbleToShowHeading &&
                    <h3 className="quote-discuss-h3">Questions &amp; Answers</h3>
                }
                {
                    discussions.map((discussion, index) => {
                        if (discussion.category === "privateNote" && !isPreviewMode) return <PrivateNote key={index} discussion={discussion} />
                        else if (discussion.category === "comment") return <Comment key={index} discussion={discussion} />
                        else if (discussion.category === "questionAndAnswer") return <QuestionAndAnswer key={index} discussion={discussion} />
                    })
                }
                <div className="clear" />
            </React.Fragment>
        );
        else return null;
    }
}
const mapStateToProps = ({ mainData }) => {
    const { discussions } = mainData.quote;
    return { discussions };
}

export default connect(mapStateToProps)(withRouter(PublicQuoteDiscussionList));
