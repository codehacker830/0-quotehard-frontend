import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import TextItemForm from '../../../../components/TextItemForm';

export const NotesSection = () => {
    const notes = useSelector(state => state.mainData.quote.notes);
    return (
        notes.map((item, index) => (
            <TextItemForm
                key={index}
                index={index}
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

export default NotesSection;
