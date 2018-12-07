import React, { Component } from 'react';
import { connect } from 'react-redux'
import { removeLog, clearConsole } from '../actions/consoleActions'

class MainBlock extends Component {
    constructor() {
        super()
        this.state = { info: true }
    }
    render() {
        return (
            <div className="flexible col darker">
                <div className="pad" style={{ fontSize: '15px' }}>
                    <span className="flexible">
                        Log
                    </span>
                    <span className=" clickable" onClick={() => {this.setState({ info: false }); this.props.clearConsole()} }>
                        Clear
                    </span>
                </div>
                <div className="flexible">
                    {this.state.info ?
                        (<div className="darker logEntry" onClick={() => this.setState({ info: false })}>
                            <span className="clickable">
                                Welcome to CryptoCompare!<br />-<br />CryptoCompare is a Clientside WebApp for tracking Cryptocurrencies.<br />Simply select a currency in the From menu, then select a currency in the To menu.<br />The Conversion Data will appear on the table in the Currency Info section of the page.<br />Click any row of the data table to print currency information to this log.<br />Click the plus button on the converter to print conversions to this log.<br />-<br />Click Me to Delete!
                        </span>
                        </div>)
                        : ""}
                    {this.props.logs.map((ele, i) => {
                        if (ele.label)
                            return (
                                <div className="darker logEntry" key={i} onClick={() => this.props.removeLog(i)}>
                                    <span className="toggled">
                                        {ele.from} -&gt; {ele.to}
                                    </span>
                                    <span className="clickable dominant logEntry">
                                        <span>
                                            {ele.label}
                                        </span>
                                        <span>
                                            <b>{ele.value}</b>
                                        </span>
                                    </span>
                                </div>)
                        else
                            return (<div className="darker logEntry" onClick={() => this.props.removeLog(i)}>
                                <span className="toggled2">
                                    {ele.from} -&gt; {ele.to}
                                </span>
                                <span className="clickable dominant logEntry">
                                    <span className="flexible">
                                        {ele.value}
                                    </span>
                                </span>
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logs: state.console
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeLog: index => {
            dispatch(removeLog(index));
        },
        clearConsole: () => {
            dispatch(clearConsole());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(MainBlock);
