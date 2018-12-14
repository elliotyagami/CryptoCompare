import React, { Component } from 'react';
import FromDisplay from './FromDisplay'
import {connect} from 'react-redux'
import { fromCurrency, addFromCurrency, removeFromCurrency } from '../../actions'
class MainBlock extends Component {
    constructor() {
        super()
        this.state = {
            from: ""
        }
    }

    getFrom(e){
        this.setState({from: e.target.value})
    }
    render() {
        return (
            <span className="flexible col">
                <div className="pad" style={{ fontSize: '15px' }}>
                    <span className="toggled">
                        From
                    </span>
                    <input maxLength="5" className="clickable" style={{ fontSize: '15px' }} value={this.state.from} onChange={this.getFrom.bind(this)}/>
                    <span className=" clickable" onClick={()=> {  this.setState({'from': ''}); return this.props.addFromCurrency(this.state.from)}}>
                        Add
                    </span>
                </div>
                <FromDisplay fromCurrency={this.props.fromCurrency} removeFromCurrency={this.props.removeFromCurrency} fromCurrencies={this.props.fromCurrencies}/>
            </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        fromCurrencies: state.conversion.fromCurrency
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFromCurrency: id => {
            dispatch(addFromCurrency(id));
        },
        removeFromCurrency: id => {
            dispatch(removeFromCurrency(id));
        },
        fromCurrency: id => {
            dispatch(fromCurrency(id));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(MainBlock);
