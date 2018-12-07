import React, { Component } from 'react';
import ConversionTable from './ConversionTable'
import {connect} from 'react-redux'
import {addToConsole} from '../../actions/consoleActions'

class ConversionInfo extends Component {
    constructor() {
        super()
        this.state = { DISPLAY: {}, PRICE: 0, from: 1, to: 0}
        this.headerRenderer = this.headerRenderer.bind(this)
        this.renderConversionRate = this.renderConversionRate.bind(this)
        this.requestData = this.requestData.bind(this)
    }

    requestData(url) {
        var currentRequest = new XMLHttpRequest();
        currentRequest.open("GET", url);
        currentRequest.onload = function () {
            let data = JSON.parse(currentRequest.responseText);
            let price =  data['RAW'][this.props.from][this.props.to]['PRICE'];
            this.setState({
                DISPLAY: data.DISPLAY,
                PRICE: price,
                to: price,
            });
        }.bind(this)
        currentRequest.send();
    }

    requestCurrencyData(fromSym, toSym) {
        const COIN_DATA_URL = "https://min-api.cryptocompare.com/data/pricemultifull";
        var url = COIN_DATA_URL + "?" + "fsyms" + "=" + fromSym + "&" + "tsyms" + "=" + toSym;
        return url;
    }
    componentDidMount(){
        let url = this.requestCurrencyData(this.props.from, this.props.to)
        this.requestData(url)
    }

    componentWillReceiveProps(props){
        let url = this.requestCurrencyData(props.from, props.to)
        this.requestData(url)
    }

    changeTo(e){
        this.setState({to: this.state.PRICE*e.target.value, from: e.target.value})
    }
    changeFrom(e){
        this.setState({from: e.target.value/this.state.PRICE, to: e.target.value})
    }

    conversionLog(){
        this.props.addToConsole({
            from: this.props.from,
            to: this.props.to,
            value: this.props.from + " " + this.state.from + " = " + this.props.to + " " + this.state.to
        })
    }


    renderConversionRate() {
        return (
            <div className="darker col paddedContainer">
                <div className="pad" style={{ fontSize: '16px' }}>
                    <span className="flexible toggled2">
                        Converter
                    </span>
                    <span className="clickable" onClick={this.conversionLog.bind(this)}>+</span>
                </div>
                <div className="pad" style={{ fontSize: '16px' }}>
                    <span className="flexible">{this.props.from}</span>
                    <input maxLength="25" className="extremelyFlexible clickable" style={{ fontSize: '16px' }} value={this.state.from} onChange={this.changeTo.bind(this)}/>
                </div>
                <div className="pad" style={{ fontSize: '16px' }}>
                    <span className="flexible">{this.props.to}</span>
                    <input maxLength="25" className="extremelyFlexible clickable" style={{ fontSize: '16px' }} value={this.state.to} onChange={this.changeFrom.bind(this)}/>
                </div>
            </div>
        )
    }

    headerRenderer() {
        return (<div className="infoDisplayFlex">
            <span className="symbol">{this.props.from}</span>
            <span className="nonSymbol">to</span>
            <span className="symbol">{this.props.to}</span>
        </div>)
    }


    render() {
        return (
            <span className="highlyFlexible col">
                <div className="pad" style={{ fontSize: '15px' }}>
                    <span className="flexible">
                        Currency Info
                    </span>
                </div>
                <div className="flexible paddedContainer">
                    {this.headerRenderer()}
                    <ConversionTable to={this.props.to} addToConsole={this.props.addToConsole} from={this.props.from} state={this.state.DISPLAY}/>
                    {this.renderConversionRate()}
                </div>
            </span>
        );
    }
}


const mapStateToProps = state => {
    return {
        'to': state.conversion.to,
        'from': state.conversion.from
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToConsole: (k) => {
            dispatch(addToConsole(k));
        },
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(ConversionInfo);
