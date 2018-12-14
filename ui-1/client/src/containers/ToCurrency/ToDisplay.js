import React, { Component } from 'react';

class ToInput extends Component {
    render() {
        return (

            <div className="flexible paddedContainer darker">
                {this.props.toCurrencies.map((ele,i) => (<div className="item darker" key={i}>
                    <span style={{flex: '2 1 0%'}} onClick={()=> this.props.toCurrency(ele)}>
                        <span className="clickable">{ele}</span>
                    </span>
                    <span style={{backgroundColor: 'rgb(43, 8, 8)', flex: '1 1 0%'}} onClick={() =>this.props.removeToCurrency(i)}>
                        <span className="clickable">-</span>
                    </span>
                </div>)
                )}
            </div>
        );
    }
}

export default ToInput;
