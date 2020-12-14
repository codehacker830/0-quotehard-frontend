import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import TextItemForm from '../../../../components/TextItemForm';
import { CONTENT_TEMPLATE_BY_ID_PATH, CONTENT_TEMPLATE_DUPLICATE_PATH } from '../../../../constants/PathNames';

const NotesSection = (props) => {
    const notes = useSelector(state => state.mainData.quote.notes);
    const isAvailablePath = (props.match.path === CONTENT_TEMPLATE_BY_ID_PATH || props.match.path === CONTENT_TEMPLATE_DUPLICATE_PATH);
    return (
        notes.map((item, index) => (
            <TextItemForm
                key={index}
                index={index}
                isViewOnly={isAvailablePath && !!item._id}
                isNote={true}
                isPaperClipDisabled={false}
                isSettingDisabled={true}
                isAddItemDisabled={false}
                isOrderUpDisabled={false}
                isOrderDownDisabled={false}
                isRemoveDisabled={false}
                {...item}
            />
        ))
    )
}

export default withRouter(NotesSection);
