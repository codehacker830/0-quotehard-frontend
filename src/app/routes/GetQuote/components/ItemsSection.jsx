import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PriceItemForm from '../../../../components/PriceItemForm'
import SubTotal from '../../../../components/SubTotal'
import TextItemForm from '../../../../components/TextItemForm'
import { CONTENT_TEMPLATE_BY_ID_PATH, CONTENT_TEMPLATE_DUPLICATE_PATH } from '../../../../constants/PathNames'

class ItemsSection extends Component {
    render() {
        const isViewOnlyPath = (this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH || this.props.match.path === CONTENT_TEMPLATE_DUPLICATE_PATH);
        return this.props.items.map((item, index) => {
            const isViewOnly = isViewOnlyPath && !!item._id;
            const isOrderUpDisabled = index === 0;
            const isOrderDownDisabled = index === this.props.items.length - 1;
            
            if (item.category === "priceItem") return <PriceItemForm
                key={index}
                index={index}
                isViewOnly={isViewOnly}
                isPaperClipDisabled={false}
                isSettingDisabled={false}
                isAddItemDisabled={false}
                isOrderUpDisabled={isOrderUpDisabled}
                isOrderDownDisabled={isOrderDownDisabled}
                isRemoveDisabled={false}
                {...item}
            />
            else if (item.category === "textItem") return <TextItemForm
                key={index}
                index={index}
                isViewOnly={isViewOnly}
                isNote={false}
                isPaperClipDisabled={false}
                isSettingDisabled={false}
                isAddItemDisabled={false}
                isOrderUpDisabled={isOrderUpDisabled}
                isOrderDownDisabled={isOrderDownDisabled}
                isRemoveDisabled={false}
                {...item}
            />
            else return <SubTotal
                key={index}
                index={index}
            />
        })
    }
}

const mapStateToProps = ({ mainData }) => {
    const { items } = mainData.quote;
    return { items };
}

export default connect(mapStateToProps)(withRouter(ItemsSection));
