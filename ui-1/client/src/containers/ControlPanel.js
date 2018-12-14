import React, { Component } from 'react';
import FromCurrency from './FromCurrency'
import ToCurrency from './ToCurrency'
import ConversionInfo from './ConversionInfo'
class MainBlock extends Component {
    render() {
        return (
            <div className="highlyFlexible flexDisplay">
            <div className="flexible flexDisplay">
            <FromCurrency/>
            <ToCurrency/>
            </div>
            <div className="flexible flexDisplay">
            </div>
            <ConversionInfo/>
            </div>
        );
    }
}

export default MainBlock;
