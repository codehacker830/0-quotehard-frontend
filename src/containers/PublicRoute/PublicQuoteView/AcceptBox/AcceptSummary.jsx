import React, { Component } from 'react'
import { connect } from 'react-redux'

class AcceptSummary extends Component {
    render() {
        return (
            <div className="acceptSummary">
                {/* <p className="summaryWrap hasTerm">
                    Total USD including TAX $<span className="summaryPartTotal">XXX</span> per month
                </p> */}
                {/* <p className="summaryWrap hasTerm">
                    Total USD including TAX $<span className="summaryPartTotal">148.50</span> per month (for 6 months) (<span className="summaryPartOption">1 of 1</span> options selected)
                </p> */}
                {/* <p className="summaryWrapzFixedCost">
                    Total USD including TAX $<span className="summaryPartTotal">330.00</span> (<span className="summaryPartOption">0 of 2</span> options selected)
                </p> */}
                <p className="summaryWrapzFixedCost">
                    Total USD including tax $<span class="summaryPartTotal">110.00</span>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptSummary)
