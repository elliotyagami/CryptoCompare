import React, { Component } from 'react';
import FromCurrency from './FromCurrency'
import ToCurrency from './ToCurrency'
import ConversionInfo from './ConversionInfo'
class MainBlock extends Component {
    render() {
        return (
            <div className="highlyFlexible flexDisplay">
            <FromCurrency/>
            <ToCurrency/>
            <ConversionInfo/>
            </div>
        );
    }
}

export default MainBlock;
