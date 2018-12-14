import React, { Component } from 'react';
import ToDisplay from './ToDisplay'
import {connect} from 'react-redux'
import { toCurrency, addToCurrency, removeToCurrency } from '../../actions'


class MainBlock extends Component {
    constructor() {
        super()
        this.state = {
            to: ""
        }
    }

    getTo(e){
        this.setState({to: e.target.value})
    }

    render() {
        return (
            <span className="flexible col">
                <div className="pad" style={{ fontSize: '15px' }}>
                    <span className="toggled">
                        To
                </span>
                <input maxLength="5" className="inputClickable flexible" style={{ fontSize: '15px' }} value={this.state.to} onChange={this.getTo.bind(this)}/>
                    <span className=" clickable" onClick={()=> {  this.setState({'to': ''}); return this.props.addToCurrency(this.state.to)}}>
                        Add
                    </span>
                </div>
                <ToDisplay toCurrency={this.props.toCurrency} removeToCurrency={this.props.removeToCurrency} toCurrencies={this.props.toCurrencies}/>
            </span>
        );
    }
}
const mapStateToProps = state => {
    return {
        toCurrencies: state.conversion.toCurrency
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCurrency: id => {
            dispatch(addToCurrency(id));
        },
        removeToCurrency: id => {
            dispatch(removeToCurrency(id));
        },
        toCurrency: id => {
            dispatch(toCurrency(id));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(MainBlock);
