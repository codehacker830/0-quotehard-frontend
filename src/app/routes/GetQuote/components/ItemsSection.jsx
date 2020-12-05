import React, { Component } from 'react'
import { connect } from 'react-redux'
import PriceItemForm from '../../../../components/PriceItemForm'
import SubTotal from '../../../../components/SubTotal'
import TextItemForm from '../../../../components/TextItemForm'

class ItemsSection extends Component {
    render() {
        return this.props.items.map((item, index) => {
            if (item.category === "priceItem") return <PriceItemForm
                key={index}
                index={index}
                isPaperClipDisabled={false}
                isSettingDisabled={false}
                isAddItemDisabled={false}
                isOrderUpDisabled={false}
                isOrderDownDisabled={false}
                isRemoveDisabled={false}
                {...item}
            />
            else if (item.category === "textItem") return <TextItemForm
                key={index}
                index={index}
                isNote={false}
                isPaperClipDisabled={false}
                isSettingDisabled={false}
                isAddItemDisabled={false}
                isOrderUpDisabled={false}
                isOrderDownDisabled={false}
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

export default connect(mapStateToProps)(ItemsSection);
